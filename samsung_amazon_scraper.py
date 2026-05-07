import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import re
import datetime
import sys

# Fix Windows console encoding for unicode chars
sys.stdout.reconfigure(encoding='utf-8')

# ─────────────────────────────────────────────────────────────────
# HEADERS – rotate between a few real user-agent strings
# ─────────────────────────────────────────────────────────────────

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
]

def get_headers():
    return {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
    }

def make_session():
    """Create a requests session that looks like a real browser."""
    session = requests.Session()
    # Prime the session by hitting Amazon homepage first to get cookies
    try:
        session.get("https://www.amazon.com", headers=get_headers(), timeout=10)
        time.sleep(random.uniform(1.5, 3))
    except Exception:
        pass
    return session


# ─────────────────────────────────────────────────────────────────
# EXTRACTOR FUNCTIONS  (one per column — modular style from tutorial)
# ─────────────────────────────────────────────────────────────────

def get_title(soup):
    """Product title from span#productTitle"""
    try:
        title = soup.find("span", attrs={"id": "productTitle"})
        return title.text.strip()
    except AttributeError:
        return "Not Available"


def get_price(soup):
    """
    Price from span.a-offscreen (most reliable).
    Falls back to whole + fraction spans.
    """
    try:
        price = soup.find("span", attrs={"class": "a-offscreen"})
        if price:
            return price.text.strip()
        whole    = soup.find("span", attrs={"class": "a-price-whole"})
        fraction = soup.find("span", attrs={"class": "a-price-fraction"})
        if whole and fraction:
            return f"${whole.text.strip()}{fraction.text.strip()}"
        return "Not Available"
    except AttributeError:
        return "Not Available"


def get_review_count(soup):
    """Total review count from span#acrCustomerReviewText"""
    try:
        review_count = soup.find("span", attrs={"id": "acrCustomerReviewText"})
        return review_count.text.strip()
    except AttributeError:
        return "Not Available"


def get_rating(soup):
    """Star rating from span.a-icon-alt (e.g. '4.3 out of 5 stars')"""
    try:
        rating = soup.find("span", attrs={"class": "a-icon-alt"})
        if rating:
            return rating.text.strip()
        rating = soup.find("i", attrs={"class": "a-star-small"})
        if rating:
            return rating.text.strip()
        return "Not Available"
    except AttributeError:
        return "Not Available"


def get_availability(soup):
    """Stock availability string"""
    try:
        avail = soup.find("div", attrs={"id": "availability"})
        if avail:
            span = avail.find("span")
            if span:
                return span.text.strip()
        return "Not Available"
    except AttributeError:
        return "Not Available"


def get_specs(soup):
    """
    Key specs from feature-bullets first, then productDetails tech table.
    Returns pipe-separated string.
    """
    try:
        # 1. Feature bullets
        bullets_div = soup.find("div", attrs={"id": "feature-bullets"})
        if bullets_div:
            items = bullets_div.find_all("span", class_="a-list-item")
            texts = [i.text.strip() for i in items if i.text.strip()]
            if texts:
                return " | ".join(texts)

        # 2. Tech-spec table (multiple possible IDs)
        for table_id in ("productDetails_techSpec_section_1",
                         "productDetails_techSpec_section_2",
                         "productDetails_db_sections"):
            table = soup.find("table", attrs={"id": table_id})
            if table:
                rows = table.find_all("tr")
                spec_list = []
                for row in rows:
                    th = row.find("th")
                    td = row.find("td")
                    if th and td:
                        key   = th.text.strip().replace("\u200f", "").replace("\u200e", "")
                        value = td.text.strip().replace("\u200f", "").replace("\u200e", "")
                        spec_list.append(f"{key}: {value}")
                if spec_list:
                    return " | ".join(spec_list)

        return "Not Available"
    except AttributeError:
        return "Not Available"


# ─────────────────────────────────────────────────────────────────
# LINK COLLECTION  (Phase 1) — three-tier fallback strategy
# ─────────────────────────────────────────────────────────────────

def collect_product_links(soup, base="https://www.amazon.com"):
    """
    Extracts all direct Amazon product page links (/dp/ASIN) from the
    search results soup.  Falls back through three strategies.
    """
    links_found = []

    # Strategy 1: specific CSS classes (current Amazon layout)
    candidate_classes = [
        "a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal",
        "a-link-normal s-no-outline",
    ]
    for cls in candidate_classes:
        for a in soup.find_all("a", attrs={"class": cls}):
            href = a.get("href", "")
            if "/dp/" in href:
                clean = href.split("/ref=")[0]
                full  = base + clean if not clean.startswith("http") else clean
                if full not in links_found:
                    links_found.append(full)

    # Strategy 2: ANY anchor that has /dp/ASIN10 pattern
    if not links_found:
        print("  [fallback-2] Broad anchor scan ...")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            if re.search(r"/dp/[A-Z0-9]{10}", href):
                clean = href.split("/ref=")[0]
                full  = base + clean if not clean.startswith("http") else clean
                if full not in links_found:
                    links_found.append(full)

    # Strategy 3: regex on raw HTML
    if not links_found:
        print("  [fallback-3] Raw-HTML regex scan ...")
        raw        = str(soup)
        asin_paths = re.findall(r'(/dp/[A-Z0-9]{10})', raw)
        for path in dict.fromkeys(asin_paths):
            full = base + path
            if full not in links_found:
                links_found.append(full)

    return links_found


# ─────────────────────────────────────────────────────────────────
# SAFE REQUEST HELPER
# ─────────────────────────────────────────────────────────────────

def safe_get(session, url, retries=3):
    """GET with retry + random delay. Returns (response | None, status_code)."""
    for attempt in range(1, retries + 1):
        try:
            resp = session.get(url, headers=get_headers(), timeout=15)
            if resp.status_code == 200:
                return resp, 200
            print(f"    [attempt {attempt}] HTTP {resp.status_code} — waiting before retry ...")
            time.sleep(random.uniform(5, 10))
        except requests.RequestException as e:
            print(f"    [attempt {attempt}] Request error: {e}")
            time.sleep(random.uniform(5, 10))
    return None, -1


# ─────────────────────────────────────────────────────────────────
# MAIN PIPELINE
# ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":

    SEARCH_URL = "https://www.amazon.com/s?k=Samsung+Mobile+Phones"

    print(f"\n{'='*60}")
    print("  Priming session (fetching Amazon home) ...")
    session = make_session()

    # ── Phase 1: search results page ──────────────────────────────
    print(f"\n{'='*60}")
    print("  PHASE 1 -- Fetching search results")
    print(f"  URL : {SEARCH_URL}")
    print(f"{'='*60}")

    resp, status = safe_get(session, SEARCH_URL)
    print(f"  HTTP Status : {status}")

    if resp is None:
        print("  FAILED — could not reach Amazon. Check your internet / try a VPN.")
        exit(1)

    soup_search  = BeautifulSoup(resp.content, "html.parser")
    links_list   = collect_product_links(soup_search)
    print(f"\n  Found {len(links_list)} unique product links.\n")

    if not links_list:
        print("  WARNING: No links found.")
        print("  Amazon may have served a CAPTCHA. Try again in a few minutes.")
        # Save debug HTML so you can inspect what Amazon returned
        with open("amazon_debug.html", "w", encoding="utf-8") as f:
            f.write(resp.text)
        print("  Debug HTML saved to amazon_debug.html for inspection.")
        exit(1)

    # ── Phase 2: individual product pages ─────────────────────────
    print(f"{'='*60}")
    print("  PHASE 2 -- Scraping individual product pages")
    print(f"{'='*60}\n")

    d = {
        "Name":          [],
        "Price":         [],
        "Review_Count":  [],
        "Rating":        [],
        "Availability":  [],
        "Specs":         [],
        "Product_URL":   [],   # direct buying link
    }

    total = len(links_list)

    for i, link in enumerate(links_list, start=1):
        print(f"  [{i:02d}/{total}] {link}")

        resp2, status2 = safe_get(session, link)
        if resp2 is None:
            print(f"         SKIP — could not fetch page")
            for key in d:
                d[key].append("Not Available" if key != "Product_URL" else link)
            continue

        prod_soup = BeautifulSoup(resp2.content, "html.parser")

        name         = get_title(prod_soup)
        price        = get_price(prod_soup)
        review_count = get_review_count(prod_soup)
        rating       = get_rating(prod_soup)
        availability = get_availability(prod_soup)
        specs        = get_specs(prod_soup)

        d["Name"].append(name)
        d["Price"].append(price)
        d["Review_Count"].append(review_count)
        d["Rating"].append(rating)
        d["Availability"].append(availability)
        d["Specs"].append(specs)
        d["Product_URL"].append(link)

        name_preview = (name[:55] + "...") if len(name) > 55 else name
        print(f"         OK  {name_preview}")
        print(f"             Price: {price}  |  Rating: {rating}  |  Stock: {availability}")

        # Polite delay between product requests
        time.sleep(random.uniform(2, 5))

    # ── Build DataFrame & clean ────────────────────────────────────
    df = pd.DataFrame.from_dict(d)
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].str.strip()

    # ── Export with timestamp so file is never locked ─────────────
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    OUTPUT    = f"samsung_mobiles_{timestamp}.csv"
    df.to_csv(OUTPUT, header=True, index=False, encoding="utf-8-sig")

    print(f"\n{'='*60}")
    print(f"  Scraping complete! {len(df)} products saved to:")
    print(f"  --> {OUTPUT}")
    print(f"{'='*60}\n")

    # Quick summary table in console
    summary = df[["Name", "Price", "Rating", "Product_URL"]].copy()
    summary["Name"] = summary["Name"].str[:45]
    print(summary.to_string(index=False))

import os
from playwright.sync_api import sync_playwright

def verify_style_updates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.getcwd()

        # 1. Verify Home Page (Hero & Cards)
        page.goto(f"file://{base_path}/index.html")
        page.screenshot(path="verification/style_home.png")
        print("Home page style screenshot captured.")

        # 2. Verify Dashboard (Progress Bars & Badges)
        page.goto(f"file://{base_path}/dashboard.html")
        page.screenshot(path="verification/style_dashboard.png")
        print("Dashboard style screenshot captured.")

        # 3. Verify Schedule (Cards & Buttons)
        page.goto(f"file://{base_path}/schedule.html")
        # Hover over first button to see hover state (if possible to capture in screenshot, usually tricky in static screenshot but good to check layout)
        page.screenshot(path="verification/style_schedule.png")
        print("Schedule style screenshot captured.")

        # 4. Verify Resources (Cards)
        page.goto(f"file://{base_path}/resources.html")
        page.screenshot(path="verification/style_resources.png")
        print("Resources style screenshot captured.")

        browser.close()

if __name__ == "__main__":
    verify_style_updates()

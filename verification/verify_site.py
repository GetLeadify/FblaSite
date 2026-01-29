import os
from playwright.sync_api import sync_playwright

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.getcwd()

        # 1. Verify Home Page
        page.goto(f"file://{base_path}/index.html")
        page.screenshot(path="verification/home.png")
        print("Home page screenshot captured.")

        # 2. Verify Dashboard
        page.goto(f"file://{base_path}/dashboard.html")
        page.screenshot(path="verification/dashboard.png")
        print("Dashboard page screenshot captured.")

        # 3. Verify Schedule & Filter Interaction
        page.goto(f"file://{base_path}/schedule.html")
        page.click('button[data-filter="tutoring"]')
        page.screenshot(path="verification/schedule.png")
        print("Schedule page screenshot captured.")

        # 4. Verify Resources & Quiz Interaction
        page.goto(f"file://{base_path}/resources.html")

        # Interact with quiz (select correct answer 'style')
        page.check('input[value="style"]')
        page.click('#submit-quiz')

        page.screenshot(path="verification/resources_quiz.png")
        print("Resources page screenshot captured.")

        browser.close()

if __name__ == "__main__":
    verify_site()

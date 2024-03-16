import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL); 
  
  // get the sign in button
  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("kal@gmail.com");  // it is going to find an element on the page that has a name of email
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign in Successfull")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Donations"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My NGO's"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();

});

test("should allow user to register", async({page})=>{
  // each time we run the test we will have each time a new email generated
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sing In"}).click();
  await page.getByRole("link", {name: "Create an account here..."}).click();
  await expect(
    page.getByRole("heading", {name: "Create an Account"})
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Shree");
  await page.locator("[name=lastName]").fill("Maharnur");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", {name: "Create Account"}).click();
  
  await expect(page.getByText("Registration Success")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Donations"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My NGO's"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});
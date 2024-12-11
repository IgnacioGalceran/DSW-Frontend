const puppeteer = require("puppeteer");

(async () => {
  try {
    console.log("🚀 Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log("🌐 Navigating to login page...");
    await page.goto("http://localhost:3000/auth");

    console.log("⏳ Waiting for email input to appear...");
    await page.waitForSelector("#email", { timeout: 2000 });

    await page.type("#email", "administrador@vercel.com.ar");
    await page.type("#password", "12345678");
    await page.click("#login-button");

    console.log("⏳ Waiting for especialidades input to appear...");
    await page.waitForSelector("#Especialidades", { timeout: 3000 });

    console.log("🔄 Navigating to specialties page...");
    await page.click("#Especialidades");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const currentUrl = page.url();
    if (currentUrl.includes("/pages/especialidades")) {
      console.log("✅ Navegación correcta hacia especialidades!");
    } else {
      throw new Error("❌ Failed to navigate to specialties page.");
    }

    console.log("⏳ Waiting for insert specialty button...");
    await page.waitForSelector("#insert-especialidad", { timeout: 5000 });

    console.log("➕ Clicking on insert specialty button...");
    await page.click("#insert-especialidad");

    console.log("⏳ Waiting for insert form...");
    await page.waitForSelector("#input-especialidad", { timeout: 3000 });

    console.log("✍️ Filling insert form...");
    await page.type("#input-especialidad", "TestEspecialidad");

    // Enviar el formulario
    console.log("✅ Submitting insert form...");
    await page.click("#add-especialidad");

    console.log("✅ Clickeando botón de confirmación...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: "./src/e2e-tests/screenshots/insert.png" });
    console.log("📸 Screenshot taken for debugging.");

    console.log("⏳ Waiting for especialidad delete...");
    await page.waitForSelector("#TestEspecialidad", { timeout: 3000 });

    console.log("✅ Clickeando botón de especialidad delete...");
    await page.click("#TestEspecialidad");

    console.log("✅ Clickeando botón de confirmación...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: "./src/e2e-tests/screenshots/delete.png" });
    console.log("📸 Screenshot taken for debugging.");

    await browser.close();
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
})();

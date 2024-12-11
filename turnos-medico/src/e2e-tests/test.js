const puppeteer = require("puppeteer");

(async () => {
  const screenshotsPath = "./src/e2e-tests/screenshots";

  // Función para iniciar sesión
  async function loginUser(page) {
    console.log("🌐 Navigating to login page...");
    await page.goto("http://localhost:3000/auth");
    await page.waitForSelector("#email", { timeout: 2000 });
    await page.type("#email", "administrador@vercel.com.ar");
    await page.type("#password", "12345678");
    await page.click("#login-button");
    console.log("✅ Login successful!");
  }

  // Función para navegar hacia Especialidades
  async function navigateToEspecialidades(page) {
    console.log("⏳ Waiting for Especialidades button...");
    await page.waitForSelector("#Especialidades", { timeout: 3000 });
    console.log("🔄 Navigating to specialties page...");
    await page.click("#Especialidades");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const currentUrl = page.url();
    if (!currentUrl.includes("/pages/especialidades")) {
      throw new Error("❌ Failed to navigate to specialties page.");
    }
    console.log("✅ Successfully navigated to specialties!");
  }

  // Función para agregar una especialidad
  async function addSpecialty(page) {
    console.log("⏳ Waiting for insert specialty button...");
    await page.waitForSelector("#insert-especialidad", { timeout: 5000 });
    console.log("➕ Clicking on insert specialty button...");
    await page.click("#insert-especialidad");

    console.log("⏳ Waiting for insert form...");
    await page.waitForSelector("#input-especialidad", { timeout: 3000 });

    console.log("✍️ Filling insert form...");
    await page.type("#input-especialidad", "TestEspecialidad");

    console.log("✅ Submitting insert form...");
    await page.click("#add-especialidad");

    console.log("✅ Clicking confirmation button...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/insert.png` });
    console.log("📸 Screenshot taken after insert.");
  }

  // Función para eliminar una especialidad
  async function deleteSpecialty(page) {
    console.log("⏳ Waiting for TestEspecialidad delete button...");
    await page.waitForSelector("#TestEspecialidad", { timeout: 3000 });

    console.log("✅ Clicking on delete specialty button...");
    await page.click("#TestEspecialidad");

    console.log("✅ Clicking confirmation button...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/delete.png` });
    console.log("📸 Screenshot taken after delete.");
  }

  try {
    console.log("🚀 Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await loginUser(page);
    await navigateToEspecialidades(page);
    await addSpecialty(page);
    await deleteSpecialty(page);

    await browser.close();
    console.log("✅ Test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
})();

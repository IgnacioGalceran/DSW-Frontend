const puppeteer = require("puppeteer");

(async () => {
  const screenshotsPath = "./src/e2e-tests/screenshots";

  async function loginUser(page) {
    console.log("🌐 Navegando a la página de login...");
    await page.goto("http://localhost:3000/auth");
    await page.waitForSelector("#email", { timeout: 2000 });
    await page.type("#email", "administrador@vercel.com.ar");
    await page.type("#password", "12345678");
    await page.click("#login-button");
    console.log("✅ Logeado correctamente!");
  }

  async function navigateToEspecialidades(page) {
    console.log("⏳ Esperando el botón de especialidades...");
    await page.waitForSelector("#Especialidades", { timeout: 3000 });

    console.log("🔄 Navegando a la página de especialidades...");
    await page.click("#Especialidades");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    const currentUrl = page.url();
    if (!currentUrl.includes("/pages/especialidades")) {
      throw new Error("❌ Falló la navegación a especialidades.");
    }
    console.log("✅ Página de especialidades cargada correctamente!");
  }

  // Función para agregar una especialidad
  async function addSpecialty(page) {
    console.log("⏳ Esperando el botón de insert...");
    await page.waitForSelector("#insert-especialidad", { timeout: 5000 });
    console.log("➕ Clickeando el botón de insert...");
    await page.click("#insert-especialidad");

    console.log("⏳ Esperando el form de especialidades...");
    await page.waitForSelector("#input-especialidad", { timeout: 3000 });

    console.log("✍️ Completando el form...");
    await page.type("#input-especialidad", "TestEspecialidad");

    console.log("✅ Clickeando el submit del form...");
    await page.click("#add-especialidad");

    console.log("✅ Clickeando el botón de confirmación...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/insert.png` });
    console.log("📸 Screenshot del insert.");
  }

  // Función para eliminar una especialidad
  async function deleteSpecialty(page) {
    console.log("⏳ Esperando el botón de delete...");
    await page.waitForSelector("#TestEspecialidad", { timeout: 3000 });

    console.log("✅ Clickeando el botón de delete...");
    await page.click("#TestEspecialidad");

    console.log("✅ Clickeando el botón de co...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/delete.png` });
    console.log("📸 Screenshot del delete.");
  }

  try {
    console.log("🚀 Abriendo el browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await loginUser(page);
    await navigateToEspecialidades(page);
    await addSpecialty(page);
    await deleteSpecialty(page);

    await browser.close();
    console.log("✅ Test completado correctamente!");
  } catch (error) {
    console.error("❌ Falló el test:", error);
  }
})();

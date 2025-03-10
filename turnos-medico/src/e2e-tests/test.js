const puppeteer = require("puppeteer");

(async () => {
  const screenshotsPath = "./";

  async function loginUser(page) {
    console.log("Navegando a la página de login...");
    await page.goto("http://localhost:3000/auth");
    await page.waitForSelector("#email", { timeout: 2000 });
    await page.type("#email", "administrador@vercel.com.ar");
    await page.type("#password", "12345678");
    await page.click("#login-button");
    console.log("Logeado correctamente!");
  }

  async function navigateToEspecialidades(page) {
    console.log("Esperando el botón de especialidades...");
    await page.waitForSelector("#Especialidades", {
      visible: true,
      timeout: 7000,
    });

    page.on("console", (msg) => {
      console.log("BROWSER LOG:", msg.text());
    });

    console.log("Navegando a la página de especialidades...");
    await page.evaluate(() => {
      document.querySelector("#Especialidades").click();
    });

    await page.waitForNavigation();

    const currentUrl = page.url();

    if (!currentUrl.includes("/pages/especialidades")) {
      throw new Error("Falló la navegación a especialidades.");
    }
    console.log("Página de especialidades cargada correctamente!");
  }

  async function addSpecialty(page) {
    console.log("Esperando que el formulario aparezca...");

    await page.waitForSelector("#insert-especialidad", {
      visible: true,
      timeout: 7000,
    });

    console.log("Clickeando el botón de insert...");
    await page.evaluate(() => {
      const btn = document.querySelector("#insert-especialidad");
      if (!btn) return;

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      btn.dispatchEvent(event);
    });

    console.log("Esperando el form de especialidades...");
    await page.waitForSelector("#input-especialidad", { timeout: 6000 });

    console.log("Completando el form...");
    await page.type("#input-especialidad", "TestEspecialidad");

    console.log("Clickeando el submit del form...");
    await page.evaluate(() => {
      const btn = document.querySelector("#add-especialidad");
      if (!btn) return;

      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      btn.dispatchEvent(event);
    });

    await page.waitForSelector("#confirma", { timeout: 3000, visible: true });
    console.log("Clickeando el botón de confirmación...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/insert.png` });
    console.log("Screenshot del insert.");
  }

  async function deleteSpecialty(page) {
    console.log("Esperando el botón de delete...");
    await page.waitForSelector("#TestEspecialidad", { timeout: 3000 });

    console.log("Clickeando el botón de delete...");
    await page.click("#TestEspecialidad");

    console.log("Clickeando el botón de confirmación...");
    await page.click("#confirma");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.screenshot({ path: `${screenshotsPath}/delete.png` });
    console.log("Screenshot del delete.");
  }

  try {
    console.log("Abriendo el browser...");
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    await loginUser(page);
    await navigateToEspecialidades(page);
    await addSpecialty(page);
    await deleteSpecialty(page);

    await browser.close();
    console.log("Test completado correctamente!");
  } catch (error) {
    console.error("Falló el test:", error);
  }
})();

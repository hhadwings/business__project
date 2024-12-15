const subscribeFooterBtn = document.getElementById("subscribe-btn");
const subscribeFooterInput = document.querySelector("#subscribe-input");

subscribeFooterBtn.addEventListener("click", () => {
    const email = subscribeFooterInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Будь ласка, введіть коректну електронну пошту.");
      return;
    }

    alert("Ви успішно підписались на наші оновлення.")
    subscribeFooterInput.value = "";
})

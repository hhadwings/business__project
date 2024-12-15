$(document).ready(function () {
  const phoneInput = $("#phone");

  phoneInput.val("+380 "); // Set initial value

  phoneInput.on("input", function () {
    let value = $(this).val().replace(/\D/g, ""); // Remove all non-numeric characters

    // Ensure the input starts with 380
    if (!value.startsWith("380")) {
      value = "380";
    }

    // Apply mask formatting: +380 XX XXX XX XX
    let formattedValue = "+380";
    if (value.length > 3) formattedValue += " " + value.substring(3, 5);
    if (value.length > 5) formattedValue += " " + value.substring(5, 8);
    if (value.length > 8) formattedValue += " " + value.substring(8, 10);
    if (value.length > 10) formattedValue += " " + value.substring(10, 12);

    $(this).val(formattedValue);
  });

  // Prevent deleting the "+380" prefix
  phoneInput.on("keydown", function (e) {
    if ($(this).val().length <= 5 && e.key === "Backspace") {
      e.preventDefault();
    }
  });
});

$(".telegram-form").on("submit", async function (event) {
  event.stopPropagation();
  event.preventDefault();

  let form = this,
    data = new FormData();


  // Get form values
  const name = $('[name="name"]', form).val().trim();
  const phone = $('[name="phone"]', form).val().trim();
  const email = $('[name="email"]', form).val().trim();
  const text = $('[name="text"]', form).val().trim();
  const date = $('[name="date"]', form).val().trim();
  const time = $('[name="time"]', form).val().trim();
  const guests = $('[name="guests"]', form).val().trim();

  // Simple field validation
  if (!name || !phone || !email || !date || !time || !guests) {
    alert("Будь ласка, заповніть всі поля.");
    return;
  }

  // Validate name (no numbers allowed)
  const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє\s'-]+$/;
  if (!nameRegex.test(name)) {
    alert("Будь ласка, введіть коректне ім'я без цифр.");
    return;
  }

  // Validate phone format (+380 XX XXX XX XX)
  const phoneRegex = /^\+380 \d{2} \d{3} \d{2} \d{2}$/;
  if (!phoneRegex.test(phone)) {
    alert(
      "Будь ласка, введіть коректний номер телефону у форматі +380 XX XXX XX XX."
    );
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Будь ласка, введіть коректну електронну пошту.");
    return;
  }

  // Append data to FormData
  data.append("name", name);
  data.append("phone", phone);
  data.append("email", email);
  data.append("text", text);
  data.append("date", date);
  data.append("time", time);
  data.append("guests", guests);

  try {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "ajax.php");

    const response = await new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error: ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(data);
    });

    alert("Бронювання успішне, дякую 😊");
    form.reset();
  } catch (error) {
    console.error("Помилка:", error);
  }

  return false;
});

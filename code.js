const today = new Date();
const todayDate = `${today.getDate()}-${
  "" + today.getMonth() + 1
}-${today.getFullYear()}`;
document.getElementById("date").textContent = todayDate;
async function cities_data() {
  try {
    const res = await fetch("cities.json");
    const data = await res.json();
    const seleccted = document.getElementById("city");
    data.forEach((cities) => {
      const option = document.createElement("option");
      option.value = cities.name;
      option.textContent = cities.name;
      seleccted.appendChild(option);
    });
  } catch (error) {}
}
cities_data();
const setdiv = document.getElementById("card");
document.getElementById("city").addEventListener("change", () => {
  setdiv.innerHTML = "";
  const d_city = document.getElementById("city").value;
  const url = `https://api.aladhan.com/v1/timingsByCity/${todayDate}?city=${d_city}&country=Morocco&method=21`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const timings = data.data.timings;
      for (let [key, value] of Object.entries(timings)) {
        if (key === "Imsak" ||key === "Lastthird" || key === "Firstthird" || key === "Midnight") continue;
        const pa = document.createElement("div");
        pa.textContent = `${key} : ${value}`;
        setdiv.appendChild(pa);
      }
      const total_ar = `${data.data.date.hijri.weekday.ar} ${data.data.date.hijri.month.number} ${data.data.date.hijri.month.ar}`;
      const total_num = `${data.data.date.hijri.date}`;
      document.getElementById("timer1").textContent = total_ar;
      document.getElementById("timer2").textContent = total_num;
    });
});

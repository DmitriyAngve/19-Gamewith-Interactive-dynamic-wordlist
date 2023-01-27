// const id = "1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw";
const id =
  "2PACX-1vTo_820UbGEUwnghQY3KplOO2xH1bNKWIr59QGFFDLwipn6idxXGQAYmQtEabBQXw45w5q6TPea-p0l";
// const url =
//   "https://spreadsheets.google.com/feeds/list/" +
//   id +
//   "/1/public/values?alt=json";

// ("https://spreadsheets.google.com/feeds/cells/1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw/1/public/full?alt=json");
// https://docs.google.com/spreadsheets/d/1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw/edit?usp=sharing
// const url =
//   "https://spreadsheets.google.com/feeds/cells/1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw/1/public/full?alt=json";
// console.log(url);
let url =
  "https://docs.google.com/spreadsheets/d/1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw/gviz/tq?";
const output = document.querySelector(".output");
const query = encodeURIComponent("Select A, B");
console.log(query);
// url = url + "&tq=" + query;
fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substring(47).slice(0, -2));
    const row = document.createElement("tr");
    output.append(row);
    data.table.cols.forEach((heading) => {
      const cell = document.createElement("td");
      cell.textContent = heading.label;
      row.append(cell);
    });
    data.table.rows.forEach((main) => {
      const container = document.createElement("tr");
      output.append(container);
      // console.log(main.c);
      main.c.forEach((ele) => {
        const cell = document.createElement("td");
        cell.textContent = ele.v;
        container.append(cell);
      });
    });
    console.log(data);
  });

// // const id = "1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw";
// const id = "1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw";
// // const url =
// //   "https://spreadsheets.google.com/feeds/list/" +
// //   id +
// //   "/1/public/values?alt=json";
// //

// // let url = "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?";
// const url =
//   "https://script.google.com/macros/s/AKfycbxsfxUxcPTYxc524HizTMCo1LVlWT8BhivW5rP57BmKxlBQUVSF6Td0ri-LFeoGDDGb/exec";

// // const url =
// //   "https://docs.google.com/spreadsheets/d/1Ba8d3_QqLnZf7ciyT8QLoOlPkKq6mj_V7jBYooAu0jw/edit?usp=sharing";
// console.log(url);
// // const output = document.querySelector(".output");
// // const query = encodeURIComponent("Select A, B, C");
// // console.log(query);
// // // url = url + "&tq=" + query;
// // fetch(url)
// //   .then((res) => res.text())
// //   .then((rep) => {
// //     const data = JSON.parse(rep.substring(47).slice(0, -2));
// //     const row = document.createElement("tr");
// //     output.append(row);
// //     data.table.cols.forEach((heading) => {
// //       const cell = document.createElement("td");
// //       cell.textContent = heading.label;
// //       row.append(cell);
// //     });
// //     data.table.rows.forEach((main) => {
// //       const container = document.createElement("tr");
// //       output.append(container);
// //       main.c.forEach((ele) => {
// //         const cell = document.createElement("td");
// //         cell.textContent = ele.v;
// //         container.append(cell);
// //       });
// //     });
// //     console.log(data);
// //     console.log(JSON.stringify(data));
// //   });

//https://docs.google.com/spreadsheets/d/1o4vIdjHUePyU90AAdjBTblO73Hn-de1sU3_KnBHr5l8/edit?usp=sharing

const id = "1o4vIdjHUePyU90AAdjBTblO73Hn-de1sU3_KnBHr5l8";
const myWords = ["Hello World", "JavaScript Code"];
const output = document.querySelector(".output");
const btn = document.createElement("button");
btn.textContent = "Load Sheet by ID";
const sheetID = document.createElement("input");
sheetID.setAttribute("type", "text");
sheetID.value = id;

output.append(sheetID);
output.append(btn);

btn.addEventListener("click", (e) => {
  console.log(sheetID.value);
  const url =
    "https://spreadsheets.google.com/feeds/list/" +
    sheetID.value +
    "/1/public/values?alt=json";
  btn.disabled = true;
  console.log(url);

  const div = document.createElement("div");
  output.append(div);

  fetch(url)
    .then((req) => req.json())
    .then((json) => {
      console.log(json["feed"]["entry"]);
      myWords.length = 0;
      let enty = json.feed.entry;
      enty.forEach((el) => {
        console.log(el.title["$t"]);
        // let temp = el["gsx$word"]["$t"];

        let temp = el.title["$t"];
        console.log(temp.includes(":"));
        if (temp.length > 0 && !temp.includes(":")) {
          myWords.push(temp);
        }
      });

      btn.disabled = false;
      console.log(myWords);
    })
    .catch((err) => {
      div.textContent = "Error: List not loaded  using default list";
      btn.disabled = false;

      const span = document.createElement("span");
      div.append(span);
      span.textContent = myWords.join(", ");
    });
});

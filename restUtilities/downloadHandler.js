
const download = function (data) {
 
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)
 
    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')
 
    // Passing the blob downloading url
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv');
 
    // Performing a download with click
    a.click()
}

const csvmaker = function (data) {
    console.log("Creating CSV...");

    const csvString = [
        [
          "Product ID",
          "Quantity"
        ],
        ...data.map(item => [
          item.productId,
          item.qty
        ])
      ]
       .map(e => e.join(",")) 
       .join("\n");
    
    return csvString;
}

function downloadCSV() {
    console.log("Downloading...");
    const productsURL = "https://7ofe4vwhj7.execute-api.us-west-2.amazonaws.com/prod/products";

    const HTTP = new XMLHttpRequest();
    HTTP.open("GET", productsURL);
    HTTP.send();

    HTTP.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            const data = HTTP.responseText;
            const jsonData = JSON.parse(data);
            const csvdata = csvmaker(jsonData.products);
            download(csvdata);
        }
    }
}

window.onload = function() {
    document.getElementById("downloadButton").onclick = function() {downloadCSV()};
}
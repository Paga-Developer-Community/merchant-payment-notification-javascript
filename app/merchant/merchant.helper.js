function Chr4() {
  return Math.random()
    .toString(36)
    .slice(-5)
    .toUpperCase();
}

function Chr5() {
  return Date.now()
    .toString()
    .slice(-5)
    .toUpperCase();
}

const customId = function() {
  return Chr5() + "-" + Chr4() + "-" + Chr4();
};

const serviceCode = function(name) {
  return name
    .split(" ")
    .join("")
    .toUpperCase()
    .slice(0, 3);
};

const uniqueNumber = function() {
  const result = Math.floor(Math.random() * 900000) + 1000000000;
  return result;
};

console.log(uniqueNumber());
module.exports = { customId, serviceCode, uniqueNumber };

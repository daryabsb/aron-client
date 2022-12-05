  
<script setup>
import { computed } from 'vue';
import fs from "fs"

console.log("fs", fs);

const { exec } = require("child_process")

exec('wmic printer list brief', (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }
  // list of printers with brief details
  // console.log(stdout);
  // the *entire* stdout and stderr (buffered)
  stdout = stdout.split("  ");
  var printers = [];
  let j = 0;
  let i = 0;
  stdout = stdout.filter(item => item);
  for (i = 0; i < stdout.length; i++) {
    if (stdout[i] == " \r\r\n" || stdout[i] == "\r\r\n") {
      printers[j] = stdout[i + 1];
      j++;
    }
  }
  // list of only printers name
  console.log(printers);
  console.log("stderr", stderr);
});

// console.log(fs);
const firstName = "Darya"
const lastName = "Ibrahim"
const fullName = computed(() => `${firstName} ${lastName}`)
</script>


<template>
  <h1 class="text-3xl text-pink-700">{{ fullName }} as developer</h1>
</template>


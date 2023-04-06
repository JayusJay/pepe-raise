const orderedMilestones = allMileStones
  .filter((milestone) => milestone.milestoneId !== 0)
  .sort((a, b) => b.milestoneId - a.milestoneId);

const pepesLevelData = orderedMilestones;

console.log("levels data::", pepesLevelData);

const levelsPepesTable = document.querySelector(
  '[datasource="levels-pepes-table"]'
);

function loadPepesTableLevels(data) {
  data.forEach((entry, index) => {
    let levelElement = "";
    let filled;
    if (entry.targetAmount.isZero()) {
      filled = 0;
    } else {
      filled =
        ((entry.totalUSDCRaised.toNumber() + entry.usdcOfPlsRaised.toNumber()) /
          entry.targetAmount.toNumber()) *
        100;
    }

    const usdcOfPlsRaised = ethers.utils.formatUnits(entry.usdcOfPlsRaised, 6);
    const usdcRaised = ethers.utils.formatUnits(entry.usdcRaised, 6);
    const priceOfPeg = ethers.utils.formatUnits(entry.priceOfPeg, 6);
    const plsRaised = ethers.utils.formatUnits(entry.plsRaised, 18);
    const targetAmount = ethers.utils.formatUnits(entry.targetAmount, 6);
    const totalUSDCRaised = ethers.utils.formatUnits(entry.totalUSDCRaised, 6);

    console.log("entry::" + index, {
      usdcOfPlsRaised,
      usdcRaised,
      priceOfPeg,
      plsRaised,
      targetAmount,
      totalUSDCRaised,
    });

    let pegPriceUsdc = entry.isCleared
      ? (parseFloat(usdcRaised) / 300000).toFixed(2)
      : "TBD";
    let pegPricePls = entry.isCleared
      ? (parseFloat(usdcOfPlsRaised) / 100000).toFixed(2)
      : "TBD";

    const usdEquivalentOfUsdcRaised = parseFloat(usdcRaised);

    const formattedUsdEquivalentOfUsdcRaised =
      usdEquivalentOfUsdcRaised.toFixed(2);

    const entryElement = document.createElement("div");
    entryElement.setAttribute("class", "level-wrapper");

    if (entry.isCleared) {
      levelElement = `<div class="l-status">
            <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/64200f60acf50ee5d2360703_SOLD%20OUT.png" loading="lazy" alt="" class="level-img">
            <div class="level-text">Level ${index + 1}</div>
         </div>`;
      entryElement.classList.add("soldout");
    } else if (filled != 0 && filled != 100) {
      levelElement = ` <div class="l-status">
            <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/6420113ecc09c93f9ec2d90f_open.png" loading="lazy" alt="" class="table_image">
            <div class="level-text">Level ${index + 1}</div>
         </div>`;
      entryElement.classList.add("open");
    } else {
      levelElement = `<div class="l-status">
            <div style="padding:0px;" fs-cmssort-type="date" fs-cmssort-field="IDENTIFIER" class="text-table-normal ld">#${
              index + 1
            }</div>
            <div class="level-text">Level ${index + 1}</div>
         </div>`;
    }

    var plsPercentage =
      (entry.usdcOfPlsRaised.toNumber() / entry.targetAmount.toNumber()) * 100;
    var usdcPercentage =
      (entry.usdcRaised.toNumber() / entry.targetAmount.toNumber()) * 100;

    if (Number.isNaN(plsPercentage)) {
      plsPercentage = 0;
    }

    if (Number.isNaN(usdcPercentage)) {
      usdcPercentage = 0;
    }

    entryElement.innerHTML = `
        <div class="top">
           <div class="left">
              ${levelElement}
           </div>
           <div class="right">
              <div class="label">
                 <div class="percent-text">${Math.round(
                   isNaN(plsPercentage) ? 0 : plsPercentage
                 )}%</div>
                 <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/641c86a3849aad0055ed175e_pls.png" loading="lazy" id="w-node-_0f41bdfe-ee9e-b32d-1cfe-34d410bb98b3-5c7ba5ac" alt="" class="image-19">
              </div>
              <div class="bar">
              <div class="pls-bar" style="width: ${plsPercentage.toFixed(
                0
              )}%;"></div>
              <div class="usdc-bar" style="width: ${usdcPercentage.toFixed(
                0
              )}%;"></div>
              <div class="label-div">
                <div class="label-text">${plsPercentage.toFixed(2)}%</div>
                <div class="label-text">${usdcPercentage.toFixed(2)}%</div>
              </div>
            </div>
              <div class="label">
                 <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/641c30595b995f2307b00772_usd-coin-usdc-logo%203.png" loading="lazy" id="w-node-_86e10863-1a82-a679-4e38-ecd53cc1b75f-5c7ba5ac" alt="" class="image-19">
                 <div class="percent-text">${Math.round(
                   isNaN(usdcPercentage) ? 0 : usdcPercentage
                 )}%</div>
              </div>
           </div>
        </div>
        <div class="values-div">
           <div class="l-block">
              <div class="l-text">Max Raise</div>
              <div class="l-value">$${targetAmount}</div>
           </div>
           <div class="l-block">
              <div class="l-text">$PEG Distribution</div>
              <div class="l-value">400,000</div>
           </div>
           <div class="l-block">
              <div class="l-text">$PEG Start Price</div>
              <div class="l-text">$${priceOfPeg}</div>
             
           </div>
        </div>
        <div id="w-node-_205469fc-209c-0b40-010d-2c691769c95a-5c7ba5ac" class="level-contributions">
           <div class="contributions-wrapper">
              <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/641c86a3849aad0055ed175e_pls.png" loading="lazy" alt="" class="label-icon">
              <div class="c-div">
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$PLS contributed</div>
                       <div class="text-distribution">$USD value</div>
                    </div>
                    <div class="div-wrapper">
                       <div class="text-block---smaill value">${parseFloat(
                         plsRaised
                       ).toFixed(2)}</div>
                       <div class="text-distribution">$${parseFloat(
                         usdcOfPlsRaised
                       ).toFixed(2)}</div>

                    </div>
                 </div>
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$PEG Price</div>
                    </div>
                    <div class="div-wrapper">
                    <div class="text-block---smaill value">${
                      pegPricePls === "TBD" ? "" : "$"
                    }${pegPricePls}</div>

                    </div>
                 </div>
              </div>
           </div>
           <div class="contributions-wrapper">
              <img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/641c30595b995f2307b00772_usd-coin-usdc-logo%203.png" loading="lazy" alt="" class="label-icon">
              <div class="c-div">
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$USDC contributed</div>
                       <div class="text-distribution">$USD value</div>
                    </div>
                    <div class="div-wrapper">
                       <div class="text-block---smaill value">${usdcRaised}</div>
                       <div class="text-distribution">${formattedUsdEquivalentOfUsdcRaised}</div>

                    </div>
                 </div>
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$PEG Price</div>
                    </div>
                    <div class="div-wrapper">
                    <div class="text-block---smaill value">${
                      pegPriceUsdc === "TBD" ? "" : "$"
                    }${pegPriceUsdc}</div>

                    </div>
                 </div>
              </div>
           </div>
        </div>
        `;
    levelsPepesTable.appendChild(entryElement);
  });
}

//Loading the first data
loadPepesTableLevels(pepesLevelData);

// if (pepesLevelData.length >= 10) {
//   let showMoreLevelsButtonElement = document.createElement("div");
//   entryElement.setAttribute("id", "showmoreLevelsButtonWrapper");
//   showMoreLevelsButtonElement.innerHTML = `<div id="w-node-_59dc2a35-3ddb-79f5-1659-43a5e5745752-5c7ba5ac" class="level-button"><div class="button-wrapper"><a id="showmoreLevelsButton" href="#" class="button-2 is-icon contribution w-inline-block"><div class="button-text"><div class="text-block-copy">Reveal All Levels</div></div></a></div></div>`;
//   levelsPepesTable.appendChild(showMoreLevelsButtonElement);

//   // Loading the rest levels when shomore levels button is clicked
//   const showMoreLevelsButton = document.getElementById("showmoreLevelsButton");

//   // add a click event listener to the "Show More" button
//   showMoreLevelsButton.addEventListener("click", () => {
//     loadPepesTableLevels(pepesLevelData.slice(10));
//     document.getElementById("showmoreLevelsButtonWrapper").style.display =
//       "none";
//   });
// }

// End of Level Details

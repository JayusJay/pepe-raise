const orderedMilestones = allMileStones
   .filter((milestone) => milestone.milestoneId !== 0)
   .sort((a, b) => a.milestoneId - b.milestoneId);

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

      console.log("filled::", {
         totalUSDCRaised: ethers.utils.formatUnits(entry.totalUSDCRaised, 6),
         usdcOfPlsRaised: ethers.utils.formatUnits(entry.usdcOfPlsRaised, 6),
         targetAmount: ethers.utils.formatUnits(entry.targetAmount, 6),
         filled,
      });

      const entryElement = document.createElement("div");
      entryElement.setAttribute("class", "level-wrapper");
      // entryElement.setAttribute('role', 'row')

      if (filled >= 100) {
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
            <div style="padding:0px;" fs-cmssort-type="date" fs-cmssort-field="IDENTIFIER" class="text-table-normal ld">#${index + 1
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

      console.log("index:" + index, { plsPercentage, usdcPercentage });


      var pegPriceForUsdcSide =
         parseFloat(ethers.utils.formatUnits(entry.usdcRaised, 18)) / 300000;
      var pegPriceForPlsSide =
         parseFloat(ethers.utils.formatUnits(entry.usdcOfPlsRaised, 18)) / 100000;

      console.log("index:" + index, { plsPercentage, usdcPercentage });

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
              <div class="l-value">$${entry.targetAmount
            .toNumber()
            .toLocaleString()}</div>
           </div>
           <div class="l-block">
              <div class="l-text">$PEG Distribution</div>
              <div class="l-value">400,000</div>
           </div>
           <div class="l-block">
              <div class="l-text">$PEG Start Price</div>
              <div class="l-text">$${pegPriceForUsdcSide.toFixed(2)}</div>
             
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
                       <div class="text-block---smaill value">PLS Level ${currentMileStone}</div>
                       <div class="text-distribution">$${parseFloat(
               ethers.utils.formatUnits(entry.plsRaised, 18)
            ).toLocaleString()}</div>

                    </div>
                 </div>
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$PEG Price</div>
                    </div>
                    <div class="div-wrapper">
                       <div class="text-block---smaill value">$${entry.targetAmount.toNumber() / 400000
         }</div>
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
                       <div class="text-block---smaill value">USDC Level ${currentMileStone}</div>
                       <div class="text-distribution">$${parseFloat(
            ethers.utils.formatUnits(entry.usdcRaised, 18)
         ).toLocaleString()}</div>

                    </div>
                 </div>
                 <div class="contribution-values">
                    <div class="div-wrapper">
                       <div class="text-block---smaill">$PEG Price</div>
                    </div>
                    <div class="div-wrapper">
                       <div class="text-block---smaill value">$${entry.targetAmount.toNumber() / 400000
         }</div>
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

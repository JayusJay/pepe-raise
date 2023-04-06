async function getAllUsers() {
    const currentMilestone = await main_contract.currentMilestone();
    let allUsers = {};

    for (let i = 1; i <= currentMilestone; i++) {
        const users = await main_contract.getUsersPerMilestone(i)
        if (i === 1) {
            for (const user of users) {
                allUsers[user.user] = {
                    plsDonations: user.plsDonations,
                    usdcDonations: user.usdcDonations,
                    usdcOfPlsDonations: user.usdcOfPlsDonations,
                    totalDonation: user.usdcDonations.add(user.usdcOfPlsDonations)
                }
               
            }
            //console.log('allUsers: ', allUsers)

            continue
        }

        for (const user of users) {
            if (user.user in allUsers) {
                const { plsDonations, usdcDonations, usdcOfPlsDonations } = user;
                const {
                    plsDonations: currentPlsDonations,
                    usdcDonations: currentUsdcDonations,
                    usdcOfPlsDonations: currentUsdcOfPlsDonations,
                    totalDonation: currentTotalDonation,
                } = allUsers[user.user];

                const totalDonation = currentUsdcDonations.add(currentUsdcOfPlsDonations).add(usdcDonations).add(usdcOfPlsDonations);

                allUsers[user.user] = {
                    ...allUsers[user.user],
                    plsDonations: currentPlsDonations.add(plsDonations),
                    usdcDonations: currentUsdcDonations.add(usdcDonations),
                    usdcOfPlsDonations: currentUsdcOfPlsDonations.add(usdcOfPlsDonations),
                    totalDonation,
                };
            }
            else {
                allUsers[user.user] = {
                    plsDonations: user.plsDonations,
                    usdcDonations: user.usdcDonations,
                    usdcOfPlsDonations: user.usdcOfPlsDonations,
                    totalDonation: user.usdcDonations.add(user.usdcOfPlsDonations)
                }

            }
            //console.log('second all users: ',allUsers)
        }
    }
    return allUsers
}

async function rankUsersDesc() {
    const allUsers = await getAllUsers()
    const donationArray = Object.entries(allUsers).map(([user, data]) => ({ user, ...data }));
    donationArray.sort((a, b) => b.totalDonation - a.totalDonation);

    return donationArray;
}

// const leaderboardData = allUsersInMileStone()
// console.log("leader board:", leaderboardData)

const leaderBoardTable = document.querySelector('[datasource="leaderboard-table"]');
leaderBoardTable.style.height = '500px'

function loadLeaderBoardData(data) {
    console.log('test:', data)
    let rank = 0;
    data.forEach((entry, index) => {
        rank = index + 1

        //Creating elements
        let rankElement = ''
        let airDropElement = ''
        let entryElement = document.createElement('div');
        let addressElement = document.createElement('div')
        let amountElement = document.createElement('div')

        // Assigning attributes to elements
        entryElement.setAttribute('class', 'table_item colour leaderboard-entry')
        entryElement.setAttribute('role', 'row')
        addressElement.setAttribute('fs-cmssort-type', 'date');
        addressElement.setAttribute('fs-cmssort-field', 'IDENTIFIER');
        amountElement.setAttribute('fs-cmssort-type', 'date');
        amountElement.setAttribute('fs-cmssort-field', 'IDENTIFIER');

        // addressElement.innerHTML = `${entry.address.substring(0, 4)}.....${entry.address.slice(-4)}`
        amountElement.innerHTML = parseFloat(parseFloat(ethers.utils.formatUnits(entry.totalDonation, 6)).toFixed(2)).toLocaleString()

        //Applying background colour class to all even entries
        if (index % 2 === 0) {
            entryElement.classList.add("anti");
        }


        //if (user.address === entry.address) {
        //  addressElement.innerHTML = "This is You!"
        //} else {
        addressElement.innerHTML = `${entry.user.substring(0, 4)}.....${entry.user.slice(-4)}`
        //s}


        if (rank <= 3) {
            if (rank == 1) rankElement = `<div class="table9_column-content"><img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/64201c51cc09c983c5c38739_Pepe%20First.png" loading="lazy" alt="" class="leaderboard_image">
                </div>`
            if (rank == 2) {
                rankElement = `<div class="table9_column-content"><img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/64201c50885ad9a63405ac90_Pepe%20Second.png" loading="lazy" alt="" class="leaderboard_image">
                </div>`
                entryElement.classList.remove('colour')
            }
            if (rank == 3) rankElement = `<div class="table9_column-content"><img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/64201c50a2bd1e700e469ca2_Pepe%20Third.png" loading="lazy" alt="" class="leaderboard_image">
                </div>`

            addressElement.setAttribute('class', 'text-leaderboard');
            amountElement.setAttribute('class', 'text-leaderboard');
            airDropElement = `<img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/64201b987894bf1462226062_Fill%2018.png" loading="lazy" alt="" class="airdrop-check">`;
        } else if (rank > 3 && rank <= 100) {
            rankElement = `<div fs-cmssort-type="date" fs-cmssort-field="IDENTIFIER" class="text-leaderboard-regular rank">#${rank}</div>`
            addressElement.setAttribute('class', 'text-leaderboard-regular');
            amountElement.setAttribute('class', 'text-leaderboard-regular');
            airDropElement = `<img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/642041dd3e934451560f38be_22%20Check.png" loading="lazy" alt="" class="airdrop-check">`
            entryElement.classList.remove('colour')
        } else {
            rankElement = `<div fs-cmssort-type="date" fs-cmssort-field="IDENTIFIER" class="text-leaderboard-regular rank">#${rank}</div>`
            addressElement.setAttribute('class', 'text-leaderboard-regular red');
            amountElement.setAttribute('class', 'text-leaderboard red');
            airDropElement = `<img src="https://uploads-ssl.webflow.com/641c2b181f41df422637adc5/6420439b7894bf2b49255cb8_Wrong.png" loading="lazy" alt="" class="airdrop-wrong">`
            entryElement.classList.remove('colour')
        }


        entryElement.innerHTML = `
            <div table-column="rank" role="cell" class="table9_column is-width-small rank">
               ${rankElement}
            </div>
            <div table-column="address" role="cell" class="table9_column is-width-large wide">
               ${addressElement.outerHTML}
            </div>
            <div table-column="" role="cell" class="table9_column is-width-large leaderboard usd">
                ${amountElement.outerHTML}
            </div>
            <div table-column="airdrop" role="cell" class="table9_column is-width-large airdrop">
               ${airDropElement}
            </div>
        `;


        leaderBoardTable.appendChild(entryElement)
    });
}


function Run(leaderboardData) {
    //load first 3 entries
  
    let startIndex = 4
    let endIndex = leaderboardData.length - 1

//load eveythin at once
    loadLeaderBoardData(leaderboardData.slice(startIndex, endIndex))
   
    function removeAllEntries() {
        // Get all the elements with the specific class name
        const elementsToRemove = document.querySelectorAll('.leaderboard-entry');

        // Loop through the selected elements and remove them one by one
        for (let i = 0; i < elementsToRemove.length; i++) {
            elementsToRemove[i].remove();
        }
    }



}


rankUsersDesc().then(data => {
    console.log('users array::', data)
    Run(data)
}).catch(err => {
    console.log('error rank users::', err)
})
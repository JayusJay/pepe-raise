async function getUserPegOwed() {
    try {
        const pegOwed = await claimContract.calculatePegOwed(address);
        return pegOwed
    }
    catch (e) {
        console.error('failed to getUserPegOwed', e);
    }
}

async function claimPeg() {
    let gasEstimate
    try {
        const estimatedUnits = await claimContract.estimateGas.claimPeg();
        gasEstimate = estimatedUnits.toNumber(); + 1e4;
    }
    catch (e) {
        console.error('failed to estimate gas for claimPeg', e);
        gasEstimate = 3e6;
    }

    try {
        const tx = await claimContract.claimPeg({ gasLimit: gasEstimate });
        await tx.wait();
        console.log('peg claimed');
    }
    catch (e) {
        console.error('failed to claim peg', e);
    }
}

async function hasUserClaimed() {
    try {
        const claimed = await claimContract.userPegClaimed(address);
        return claimed;
    }
    catch (e) {
        console.error('failed to getUserClaimed', e);
    }
}

async function isClaimEnabled() {
    try {
        const enabled = await claimContract.claimEnabled();
        return enabled;
    }
    catch (e) {
        console.error('failed to getClaimEnabled', e);
    }
}

async function getTotalPegClaimable() {
    try {
        const pegClaimable = await claimContract.totalPegClaimable();
        return pegClaimable
    }
    catch (e) {
        console.error('failed to getTotalPegClaimable', e);
    }
}
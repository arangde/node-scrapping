/**
 * Created by jaran on 10/09/2016.
 */

export function getFloatValue(text) {
    const floatVal = parseFloat(/([0-9.-]+)/g.exec(text.replace(/,/g, ''))[1]);

    if(text.indexOf("Million") === -1) {
        return floatVal;
    }
    else {
        return Math.round(floatVal * 1000000);
    }
}

export function getNextJackpot(html) {
    return getFloatValue(html.find('.resultsJackpot').text());
};

export function getJackpot(html) {
    const jackpot = getNextJackpot(html);
    const ins = html.find(".jackpotchange ins");
    if(ins.length && (ins.hasClass("sprite-jackpot-down-16") || ins.hasClass("sprite-jackpot-up-16"))) {
        const jackpotChange = getFloatValue(html.find(".jackpotchange").text());
        const direction = ins.hasClass("sprite-jackpot-down-16") ? -1 : 1;
        return jackpot - (jackpotChange * direction);
    }
    else {
        return jackpot;
    }
};

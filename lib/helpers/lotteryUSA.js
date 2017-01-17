/**
 * Created by jaran on 9/23/2016.
 */
import cheerio from 'cheerio';

export function filterGameRow(title, html) {
    const $ = cheerio.load(html);
    const cell = html.find('div.game-title').filter(function () {
        return $(this).text() == title;
    });

    return cell.parents("tr");
};

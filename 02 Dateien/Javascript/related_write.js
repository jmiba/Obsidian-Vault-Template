/**
 * Retrieves topics from the current file's frontmatter or defaults to an empty array.
 */
const topics = dv.current().file.frontmatter.topics ?? [];
//console.log("Topics: " + topics)

/**
 * Retrieves the current file name.
 */
const file = dv.current().file.name

/**
 * Accumulated string for rendering notes.
 */
let toRender = '';

/**
 * Type of notes for the first query (e.g., "Meine Notes").
 */
let notes1 = 'Meine Notes';

/**
 * Type of notes for the second query (e.g., "Relevante Literatur").
 */
let notes2 = 'Relevante Literatur'

/**
 * Query statement for excluding specific paths in the first query.
 */
const excludeStatement = '!contains(file.path, "04 Literatur-Notes/"';

/**
 * Query statement for including specific paths in the second query.
 */
const includeStatement = 'contains(file.path, "04 Literatur-Notes/"';

/**
 * Main logic to query and render notes based on topics.
 */
if (topics != null && topics != undefined && topics != '') {
    const query1 = await queryNotes(topics, notes1, file, toRender, excludeStatement);
    const query2 = await queryNotes(topics, notes2, file, toRender, includeStatement);
    toRender = `> #### ${notes1}\n${query1}\n&nbsp;\n#### ${notes2}\n${query2}`;
} else {
    toRender ="Noch kein Thema in Frontmatter `topics` definiert!";
}

toRender = toRender.replace(/\n/g, '\n> ');

/**
 * Renders the accumulated notes using the dv_insert view.
 */
await dv.view("02 Dateien/Javascript/dv_insert", { target: "A", msg: toRender})

/**
 * Queries related notes for each topic.
 *
 * @param {Array} topics - List of topics to query.
 * @param {string} notes - Type of notes (e.g., "Meine Notes" or "Relevante Literatur").
 * @param {string} file - Current file name.
 * @param {string} toRender - Accumulated string for rendering notes.
 * @param {string} statement - Query statement for filtering notes.
 * @returns {string} - Updated toRender string.
 */
async function queryNotes(topics, notes, file, toRender, statement) {
    for (const topic of topics) {
        toRender += `##### Zum Thema "${topic}":\n`;
        const related = await dv.query(` 
            LIST created
            FLATTEN topics AS t
            WHERE t = "${topic}" AND file.name != "${file}" AND ${statement})
            SORT created ASC
        `);
        if (related.successful === true) {
            if (related.value.values.length > 0) {
                const list = []
                for (const item of related.value.values) {
                    const createdDate = moment(item.value.toString().split(/[T\s]/)[0]).format('DD.MM.YYYY');
                    list.push(`${item.key} (${createdDate})`);
                }
                toRender += dv.markdownList(list)            
            } else {
                toRender += `Noch keine Zusammenhänge in "${notes}" für das Thema "${topic}"!\n\n`;
            }
        } else {
            toRender += `Fehler beim Abfragen der Zusammenhänge in "${notes}" für das Thema: "${topic}"!\n\n`;
        }
    };
    return toRender;
}
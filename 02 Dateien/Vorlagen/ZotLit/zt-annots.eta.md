
<% const byColor = Object.groupBy(it, (annot) => annot.colorName);
const label = {
  "yellow": ["Fragen","question"],
  "red": ["Kritikwürdiges","bug"],
  "green": ["Hauptgedanken","idea"],
  "blue": ["Fakten","fact"],
  "purple": ["Argumente/Lösungen","argument"],
  "magenta": ["Meinungen","opinion"],
  "orange": ["Weiterverfolgen","pursue"],
  "gray": ["Zitierbare Stellen","cite"],
};
// Merge colors with customized label with unexpected colors, if any
// Keep the order of the colors from the original color-label map
const colorSet = new Set([...Object.keys(label), ...Object.keys(byColor)]);
for (const color of colorSet) { 
if (!(color in byColor)) continue -%>
## <%= label[color][0] ?? color %>
<%_ for (const annot of byColor[color]) { 
annot.callout= label[color][1]; %>
<%~ include("annotation", annot) %>
<% } %>
<% } %>
const fs = require('fs');

// Fix ProductDetailsPage
let pCode = fs.readFileSync('src/pages/ProductDetailsPage.tsx', 'utf8');
pCode = pCode.replace('</>', '</>');
pCode = pCode.replace('</>', '</>'); 
// Wait, my typo in the file was `</>` (with a space) or `</>`.
// Let me just replace the exact line 346:
let pLines = pCode.split('\n');
for (let i = 0; i < pLines.length; i++) {
   if (pLines[i].includes('</>')) {
      pLines[i] = pLines[i].replace('</>', '</>');
   }
}
fs.writeFileSync('src/pages/ProductDetailsPage.tsx', pLines.join('\n'));

// Fix App.tsx
let aCode = fs.readFileSync('src/App.tsx', 'utf8');
aCode = aCode.replace('import ProductDetailsPage from "@/pages/ProductDetailsPage";\\nimport ProductDetailsPage from "@/pages/ProductDetailsPage";', 'import ProductDetailsPage from "@/pages/ProductDetailsPage";');
aCode = aCode.replace(/<Route path="\\/products" element={<ProductsPage \\/>} \\/>/g, '<Route path="/products" element={<ProductsPage />} />\\n              <Route path="/product/:id" element={<ProductDetailsPage />} />');
fs.writeFileSync('src/App.tsx', aCode);

console.log("Fixed files!");

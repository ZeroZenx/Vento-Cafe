import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { adminSpanish, translateAdminText } from "../data/admin-translations.ts";

test("every explicit admin translation has Spanish copy", () => {
  for (const file of ["components/admin/AdminDashboard.tsx", "components/admin/AdminLogin.tsx"]) {
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "t" && ts.isStringLiteral(node.arguments[0])) {
        assert(adminSpanish[node.arguments[0].text.trim()], `Missing Spanish: ${node.arguments[0].text}`);
      }
      if (ts.isJsxAttribute(node) && node.name.text === "label" && node.initializer && ts.isStringLiteral(node.initializer)) {
        assert(adminSpanish[node.initializer.text], `Missing Spanish label: ${node.initializer.text}`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});

test("translation preserves spacing, currency and unknown product names", () => {
  assert.equal(translateAdminText("es", " in stock "), " en existencia ");
  assert.equal(translateAdminText("es", "$100.00"), "$100.00");
  assert.equal(translateAdminText("en", "Products"), "Products");
  assert.equal(translateAdminText("es", "Example product"), "Example product");
  assert.equal(translateAdminText("es", "Incorrect password."), "Contraseña incorrecta.");
});

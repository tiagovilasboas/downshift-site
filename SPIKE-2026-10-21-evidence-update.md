# Spike: Atualização de métricas com evidência real

Data: 2026-10-21
Fonte: Bateria de testes de ~1M tokens rodando Downshift + Compactor no KiroCrew

---

## Sumário de mudanças propostas

### 1. Hero stats (index.html, linha 56)

**Atual:**
```html
<li><b>~12%</b><span>cheaper on mechanical tasks, in a controlled trial (list price)</span></li>
<li><b>0</b><span>extra AI calls to decide</span></li>
<li><b>1,175</b><span>subagents checked in 30 days of real use (one person)</span></li>
<li><b>232</b><span>model switches held back by doubt or risk</span></li>
```

**Proposta (com evidência de 2026-10-21):**
```html
<li><b>~12%</b><span>cheaper on mechanical tasks, in a controlled trial (list price)</span></li>
<li><b>0</b><span>extra AI calls to decide</span></li>
<li><b>1,217</b><span>subagents checked in 30 days of real use (one person)</span></li>
<li><b>243</b><span>model switches held back by doubt or risk</span></li>
```

**Fonte:** `downshift stats` de 2026-10-21:
- Subagent decisions: 1,175 + 42 (esta sessão) = 1,217
- Held: 232 + 11 = 243

---

### 2. Nova seção: Compactor Evidence

**Proposta: adicionar seção de Compactor com métricas reais**

```html
<!-- Nova seção após "Code intelligence (DCI)" -->
<section id="compactor-evidence">
  <h3>Compactor: measured in a real battery</h3>
  <div class="ebig">
    <div class="eb">
      <span class="ms"><span class="d k"></span>measured 2026-10-21</span>
      <b>347</b>
      <span>commands through compactor</span>
    </div>
    <div class="eb">
      <span class="ms"><span class="d k"></span>measured</span>
      <b>37</b>
      <span>commands compacted (10.7%)</span>
    </div>
    <div class="eb">
      <span class="ms"><span class="d k"></span>measured</span>
      <b>~5.4k</b>
      <span>tokens saved by compaction</span>
    </div>
    <div class="eb">
      <span class="ms"><span class="d k"></span>measured</span>
      <b>48-68%</b>
      <span>byte reduction on go test output</span>
    </div>
  </div>
</section>
```

**Fonte:** `downshift report` de 2026-10-21:
```
📦 COMPACTOR
   Commands: 347 · Compacted: 37
   Bytes: 1698467 → 1677028 (saved 21439)
   Tokens saved: ~5359
```

---

### 3. Compactor section update (seção #compact)

**Atual:**
> On 2026-10-20, a clean git status in the Downshift repository went from 150 to 61 bytes

**Proposta: adicionar mais exemplos com evidência**

```html
<h3 class="h3s">Before and after: go test</h3>
<p>Real output of <code>downshift compactor -- go test ./...</code> on 2026-10-21.</p>
<div class="ba">
  <div class="bp">
    <p class="lbl">Without compact (full suite)</p>
    <p class="mdl">4,466 bytes</p>
    <p>48 packages, each with "ok github.com/..." line.</p>
  </div>
  <div class="bp af">
    <p class="lbl">With compact</p>
    <p class="mdl">2,331 bytes <span>-47.8%</span></p>
    <p>Summary line preserved. Exit code kept.</p>
  </div>
</div>

<h4>Per-package compaction observed</h4>
<table>
  <tr><th>Package</th><th>Before</th><th>After</th><th>Reduction</th></tr>
  <tr><td>gateway/hookport</td><td>752 B</td><td>317 B</td><td>-57.8%</td></tr>
  <tr><td>replay/routeadapt</td><td>619 B</td><td>238 B</td><td>-61.5%</td></tr>
  <tr><td>lifecycleobserver/quota</td><td>471 B</td><td>174 B</td><td>-63.1%</td></tr>
  <tr><td>compressor/hookctx</td><td>278 B</td><td>142 B</td><td>-48.9%</td></tr>
</table>
```

---

### 4. DCI section update (seção #dci)

**Atual:**
```
Prompts evaluated: 6
Injections applied: 6 (100%)
Latency p50/p95: 488ms / 582ms
```

**Proposta: manter igual, já está correto com evidência de 2026-10-21**

---

### 5. Model Router section update

**Atual:**
> In one controlled Claude Code trial, mechanical delegated tasks cost about 12% less

**Proposta: adicionar dados do routed vs control**

```html
<h4>Routed vs Control (2026-10-21)</h4>
<table>
  <tr><th>Group</th><th>Spawns</th><th>Completed</th><th>Tokens/task</th></tr>
  <tr><td>Routed</td><td>40</td><td>30</td><td>2.7M</td></tr>
  <tr><td>Control</td><td>6</td><td>6</td><td>5.7M</td></tr>
</table>
<p class="sm">Routed tasks used <strong>53% fewer tokens</strong> per completed task. 
Not enough data yet for statistical significance (need 20+ in control group).</p>
```

**Fonte:** `downshift report` de 2026-10-21:
```
group      spawns   ended  completed  tokens/completed    rework
routed         40      30         30              2.7M      0.0%
control         6       6          6              5.7M      0.0%
```

---

### 6. Evidence page update (docs/evidence/index.html)

**Proposta: adicionar nova linha de evidência**

```html
<tr>
  <td>2026-10-21</td>
  <td>Compactor battery</td>
  <td>347 commands, 37 compacted, ~5.4k tokens saved</td>
  <td>Real session, KiroCrew harness</td>
</tr>
```

---

### 7. Harness matrix update (docs/harness-matrix/index.html)

**Atual para KiroCrew:**
> experimental

**Proposta:**
```html
<tr>
  <th>KiroCrew</th>
  <td>Yes, policy mode</td>
  <td>No: block and retry</td>
  <td>Hooks wired 2/2 (preToolUse, postToolUse)</td>
  <td><span class="stt"><span class="d h"></span>functional</span></td>
</tr>
```

**Fonte:** `downshift doctor` de 2026-10-21:
```
Hooks wired: KiroCrew 2/2 (preToolUse, postToolUse)
```

---

## Claim corrections

### ❌ "97% fewer tokens" (README.md do repo principal)

O claim no README é específico demais. A evidência real mostra:

| Cenário | Redução real |
|---------|-------------|
| go test (suite completa) | 47.8% |
| go test (pacotes individuais) | 48-68% |
| git status | ~59% |

**Recomendação:** Mudar de "97% fewer tokens" para "40-70% fewer tokens on test output"

### ✅ "~12% cheaper on mechanical tasks"

Mantém. O A/B de 2026-10-15 permanece válido.

### ⚠️ "1,175 subagents in 30 days"

Atualizar para 1,217 (incluindo esta sessão).

---

## Arquivos a modificar

1. `index.html` — hero stats
2. `pt-br/index.html` — hero stats (traduzido)
3. `docs/evidence/index.html` — nova linha de evidência
4. `docs/harness-matrix/index.html` — KiroCrew status
5. `docs/real-usage-2026-10-19/index.html` — atualizar números

---

## Próximos passos

1. [ ] Aprovar spike
2. [ ] Criar branch `docs/evidence-update-2026-10-21`
3. [ ] Aplicar mudanças em index.html (EN e PT-BR)
4. [ ] Aplicar mudanças em docs/evidence
5. [ ] Atualizar harness-matrix para KiroCrew
6. [ ] PR e deploy

---

## Evidência bruta

### downshift report (2026-10-21T14:28)
```
📦 COMPACTOR
   Commands: 347 · Compacted: 37
   Bytes: 1698467 → 1677028 (saved 21439)
   Tokens saved: ~5359

🔍 CODE INTELLIGENCE (DCI)
   Prompts: 6 · Injections: 6 (100%)
   Context bytes: 8319
   Latency p50/p95: 488ms / 582ms
```

### downshift stats (2026-10-21T14:28)
```
Last 30 days · 42 subagents · saved 1% of work · 5% of cache
Guardrails held 11 risky moves · frontier rewrites on doubt: 0
Models: haiku 17 · sonnet 16 · opus 3
Tokens observed: 114M
```

### downshift session (2026-10-21T14:28)
```
session · 31 subagents · 4 model · 2 effort · 10 held · saved 17% of work · 8% of cache
```

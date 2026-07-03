/* ============================================================================
 * AEO Visibility Scorecard — DATASET  (edit THIS file; no tool code changes)
 * Loads as a plain <script>, so it works opened locally (file://) AND hosted.
 * Swap brand / competitors / queries / demo scores here to run any category.
 * The tool supports ANY number of queries and assistants — this demo uses 10.
 * ==========================================================================*/
window.SCORECARD_DATA = {
  // --- identity (fictional placeholder brand — "ABC" signals it's a demo) ---
  brand: "ABC",
  brandSite: "abc.example",
  category: "an AI-native workflow platform for growth teams",

  // --- who we measure against (AI-category names for clarity) ---
  assistants: ["ChatGPT", "Gemini", "Perplexity", "Claude"],
  competitors: ["Rowen AI", "Arclight AI", "Meridian AI", "Halston Systems", "Northbeam Labs", "Verdant"],

  // --- ground truth for the (optional) Accuracy metric / hallucination check ---
  brandFacts: [
    "ABC is a fictional placeholder brand used to demonstrate this tool.",
    "In the demo it stands in for an AI-native workflow platform for growth teams.",
    "Assistants have no real data on ABC, so any confident specifics are hallucinations."
  ],

  // --- 10 common, cross-business buyer-intent queries (category / comparison / evaluation) ---
  queries: [
    "Best AI workflow tools for growth teams",
    "Top AI-native go-to-market platforms in 2026",
    "Best AI tool to automate growth experiments",
    "ABC vs Rowen AI",
    "ABC alternatives",
    "ABC pricing",
    "ABC reviews",
    "Is ABC worth it for an early-stage startup?",
    "Does ABC integrate with HubSpot and Salesforce?",
    "What does ABC do?"
  ],

  capturedNote: "Illustrative demo data. Swap in your own brand + score real runs to get real numbers.",

  // --- pre-computed synthetic demo scores (illustrative) ---
  // keyed "<query> ||| <assistant>". Pattern reflects reality: ChatGPT & Perplexity
  // cite sources often, Gemini & Claude rarely; branded queries surface less than category ones.
  demo: {
    baseline: {
      "Best AI workflow tools for growth teams ||| ChatGPT": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "Best AI workflow tools for growth teams ||| Gemini": { mentioned:true, rec:true, pos:"3", cited:false, acc:"Correct", comps:["Rowen AI","Arclight AI"], note:"" },
      "Best AI workflow tools for growth teams ||| Perplexity": { mentioned:true, rec:false, pos:"4", cited:true, acc:"Correct", comps:["Rowen AI","Halston Systems","Northbeam Labs"], note:"" },
      "Best AI workflow tools for growth teams ||| Claude": { mentioned:true, rec:false, pos:"3", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| ChatGPT": { mentioned:true, rec:true, pos:"3", cited:true, acc:"Correct", comps:["Meridian AI","Arclight AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Gemini": { mentioned:true, rec:false, pos:"5", cited:false, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Perplexity": { mentioned:true, rec:true, pos:"4", cited:true, acc:"Correct", comps:["Rowen AI","Verdant"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:["Rowen AI","Meridian AI"], note:"not named" },
      "Best AI tool to automate growth experiments ||| ChatGPT": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Northbeam Labs"], note:"" },
      "Best AI tool to automate growth experiments ||| Gemini": { mentioned:true, rec:true, pos:"2", cited:false, acc:"Partial", comps:["Arclight AI"], note:"" },
      "Best AI tool to automate growth experiments ||| Perplexity": { mentioned:true, rec:false, pos:"3", cited:true, acc:"Correct", comps:["Rowen AI","Northbeam Labs"], note:"" },
      "Best AI tool to automate growth experiments ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:["Northbeam Labs"], note:"" },
      "ABC vs Rowen AI ||| ChatGPT": { mentioned:true, rec:true, pos:"", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "ABC vs Rowen AI ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Wrong", comps:["Rowen AI"], note:"hallucinated a feature" },
      "ABC vs Rowen AI ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC vs Rowen AI ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "ABC alternatives ||| ChatGPT": { mentioned:true, rec:false, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI","Meridian AI","Arclight AI"], note:"" },
      "ABC alternatives ||| Gemini": { mentioned:true, rec:false, pos:"1", cited:false, acc:"Correct", comps:["Rowen AI","Halston Systems"], note:"" },
      "ABC alternatives ||| Perplexity": { mentioned:true, rec:false, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI","Northbeam Labs","Verdant"], note:"" },
      "ABC alternatives ||| Claude": { mentioned:true, rec:false, pos:"1", cited:false, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "ABC pricing ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"vague on pricing" },
      "ABC pricing ||| Gemini": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"no pricing info" },
      "ABC pricing ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Partial", comps:[], note:"" },
      "ABC pricing ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"declined — no data" },
      "ABC reviews ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" },
      "ABC reviews ||| Gemini": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"" },
      "ABC reviews ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Partial", comps:[], note:"" },
      "ABC reviews ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"" },
      "Is ABC worth it for an early-stage startup? ||| ChatGPT": { mentioned:true, rec:true, pos:"", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Perplexity": { mentioned:true, rec:true, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:["Rowen AI"], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:false, acc:"Wrong", comps:[], note:"claimed unverified integrations" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Gemini": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Partial", comps:[], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"" },
      "What does ABC do? ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" },
      "What does ABC do? ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" }
    },
    // Current = after an AEO optimization push: more mentions, more recommendations,
    // Gemini/Claude begin citing, accuracy up. (Illustrative before/after.)
    current: {
      "Best AI workflow tools for growth teams ||| ChatGPT": { mentioned:true, rec:true, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "Best AI workflow tools for growth teams ||| Gemini": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Best AI workflow tools for growth teams ||| Perplexity": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Rowen AI","Northbeam Labs"], note:"" },
      "Best AI workflow tools for growth teams ||| Claude": { mentioned:true, rec:true, pos:"2", cited:false, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| ChatGPT": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Meridian AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Gemini": { mentioned:true, rec:true, pos:"3", cited:false, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Perplexity": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Top AI-native go-to-market platforms in 2026 ||| Claude": { mentioned:true, rec:false, pos:"4", cited:false, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "Best AI tool to automate growth experiments ||| ChatGPT": { mentioned:true, rec:true, pos:"1", cited:true, acc:"Correct", comps:["Northbeam Labs"], note:"" },
      "Best AI tool to automate growth experiments ||| Gemini": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Arclight AI"], note:"" },
      "Best AI tool to automate growth experiments ||| Perplexity": { mentioned:true, rec:true, pos:"2", cited:true, acc:"Correct", comps:["Northbeam Labs"], note:"" },
      "Best AI tool to automate growth experiments ||| Claude": { mentioned:true, rec:false, pos:"3", cited:false, acc:"Correct", comps:["Northbeam Labs"], note:"" },
      "ABC vs Rowen AI ||| ChatGPT": { mentioned:true, rec:true, pos:"", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC vs Rowen AI ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:["Rowen AI"], note:"accurate now" },
      "ABC vs Rowen AI ||| Perplexity": { mentioned:true, rec:true, pos:"", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC vs Rowen AI ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC alternatives ||| ChatGPT": { mentioned:true, rec:false, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI","Meridian AI"], note:"" },
      "ABC alternatives ||| Gemini": { mentioned:true, rec:false, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC alternatives ||| Perplexity": { mentioned:true, rec:false, pos:"1", cited:true, acc:"Correct", comps:["Rowen AI","Northbeam Labs"], note:"" },
      "ABC alternatives ||| Claude": { mentioned:true, rec:false, pos:"1", cited:false, acc:"Correct", comps:["Rowen AI"], note:"" },
      "ABC pricing ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "ABC pricing ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" },
      "ABC pricing ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "ABC pricing ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" },
      "ABC reviews ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "ABC reviews ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Partial", comps:[], note:"" },
      "ABC reviews ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "ABC reviews ||| Claude": { mentioned:false, rec:false, pos:"", cited:false, acc:"", comps:[], note:"" },
      "Is ABC worth it for an early-stage startup? ||| ChatGPT": { mentioned:true, rec:true, pos:"", cited:true, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Gemini": { mentioned:true, rec:true, pos:"", cited:false, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Perplexity": { mentioned:true, rec:true, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "Is ABC worth it for an early-stage startup? ||| Claude": { mentioned:true, rec:true, pos:"", cited:false, acc:"Correct", comps:["Rowen AI"], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"accurate now" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:[], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "Does ABC integrate with HubSpot and Salesforce? ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| ChatGPT": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| Gemini": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| Perplexity": { mentioned:true, rec:false, pos:"", cited:true, acc:"Correct", comps:[], note:"" },
      "What does ABC do? ||| Claude": { mentioned:true, rec:false, pos:"", cited:false, acc:"Correct", comps:[], note:"" }
    }
  },

  // --- links ---
  githubUrl: "https://github.com/raina7sri/ai-visibility-scorecard",
  auricsUrl: "https://aurics.ai"
};

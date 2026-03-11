// pages/liberal-vs-conservative.js
import { useState, useMemo } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const LEANS = ["Very Liberal", "Liberal", "Moderate", "Conservative", "Very Conservative"];

const LEAN_STYLES = {
  "Very Liberal":      { badge: "bg-blue-600",   text: "text-white", icon: "🔵" },
  "Liberal":           { badge: "bg-sky-500",    text: "text-white", icon: "🩵" },
  "Moderate":          { badge: "bg-slate-500",  text: "text-white", icon: "⚖️" },
  "Conservative":      { badge: "bg-orange-500", text: "text-white", icon: "🟠" },
  "Very Conservative": { badge: "bg-red-600",    text: "text-white", icon: "🔴" },
};

const PILL_ACTIVE = {
  "All":               "bg-slate-300 text-slate-950",
  "Very Liberal":      "bg-blue-600 text-white",
  "Liberal":           "bg-sky-500 text-white",
  "Moderate":          "bg-slate-500 text-white",
  "Conservative":      "bg-orange-500 text-white",
  "Very Conservative": "bg-red-600 text-white",
};

const COLLEGES = [
  // ── VERY LIBERAL ──────────────────────────────────────────────────────────
  { name: "Antioch College",                   state: "OH", type: "Private", lean: "Very Liberal", notes: "Social justice mission, radical curriculum" },
  { name: "Bard College",                      state: "NY", type: "Private", lean: "Very Liberal", notes: "Arts-heavy, faculty 95%+ Dem donors" },
  { name: "Barnard College",                   state: "NY", type: "Private", lean: "Very Liberal", notes: "Columbia affiliate, strong feminist tradition" },
  { name: "Bennington College",                state: "VT", type: "Private", lean: "Very Liberal", notes: "Arts-liberal arts, politically engaged" },
  { name: "Bryn Mawr College",                 state: "PA", type: "Private", lean: "Very Liberal", notes: "Women's college, feminist tradition" },
  { name: "Brown University",                  state: "RI", type: "Private", lean: "Very Liberal", notes: "Open curriculum, most progressive Ivy" },
  { name: "Colorado College",                  state: "CO", type: "Private", lean: "Very Liberal", notes: "Block plan, strong environmental activism" },
  { name: "Earlham College",                   state: "IN", type: "Private", lean: "Very Liberal", notes: "Quaker school, social justice-focused" },
  { name: "Evergreen State College",           state: "WA", type: "Public",  lean: "Very Liberal", notes: "Epicenter of campus activism nationally" },
  { name: "Goddard College",                   state: "VT", type: "Private", lean: "Very Liberal", notes: "Progressive, self-directed learning" },
  { name: "Grinnell College",                  state: "IA", type: "Private", lean: "Very Liberal", notes: "Self-governance tradition, very liberal" },
  { name: "Hampshire College",                 state: "MA", type: "Private", lean: "Very Liberal", notes: "No grades, intense activist culture" },
  { name: "Haverford College",                 state: "PA", type: "Private", lean: "Very Liberal", notes: "Honor code, strong progressive culture" },
  { name: "Knox College",                      state: "IL", type: "Private", lean: "Very Liberal", notes: "Lincoln-Douglas birthplace, progressive today" },
  { name: "Lewis & Clark College",             state: "OR", type: "Private", lean: "Very Liberal", notes: "Environmental + social justice focus" },
  { name: "Macalester College",                state: "MN", type: "Private", lean: "Very Liberal", notes: "Famously liberal, international focus" },
  { name: "Mount Holyoke College",             state: "MA", type: "Private", lean: "Very Liberal", notes: "Women's college, progressive leadership" },
  { name: "Oberlin College",                   state: "OH", type: "Private", lean: "Very Liberal", notes: "Tops Princeton Review's most liberal list" },
  { name: "Occidental College",                state: "CA", type: "Private", lean: "Very Liberal", notes: "Obama's alma mater, strong campus activism" },
  { name: "Pitzer College",                    state: "CA", type: "Private", lean: "Very Liberal", notes: "Claremont Colleges' most activist campus" },
  { name: "Reed College",                      state: "OR", type: "Private", lean: "Very Liberal", notes: "Academic intensity meets radical left politics" },
  { name: "Sarah Lawrence College",            state: "NY", type: "Private", lean: "Very Liberal", notes: "Progressive arts, strong feminist tradition" },
  { name: "Smith College",                     state: "MA", type: "Private", lean: "Very Liberal", notes: "Women's college, strong activist culture" },
  { name: "SUNY Purchase",                     state: "NY", type: "Public",  lean: "Very Liberal", notes: "Arts-focused, very liberal culture" },
  { name: "Swarthmore College",                state: "PA", type: "Private", lean: "Very Liberal", notes: "Social activism, Quaker tradition" },
  { name: "The New School",                    state: "NY", type: "Private", lean: "Very Liberal", notes: "Radical politics, social sciences" },
  { name: "UC Berkeley",                       state: "CA", type: "Public",  lean: "Very Liberal", notes: "Historically radical, Free Speech Movement birthplace" },
  { name: "UC Santa Cruz",                     state: "CA", type: "Public",  lean: "Very Liberal", notes: "Environmental activism, laid-back radical culture" },
  { name: "Vassar College",                    state: "NY", type: "Private", lean: "Very Liberal", notes: "Women's college turned co-ed, very liberal" },
  { name: "Warren Wilson College",             state: "NC", type: "Private", lean: "Very Liberal", notes: "Environmental activism, DIY ethos" },
  { name: "Wellesley College",                 state: "MA", type: "Private", lean: "Very Liberal", notes: "Women's college, politically active" },
  { name: "Wesleyan University",               state: "CT", type: "Private", lean: "Very Liberal", notes: "Faculty and student strong left lean" },
  { name: "Whitman College",                   state: "WA", type: "Private", lean: "Very Liberal", notes: "Politically active, Pacific NW liberal" },
  { name: "Eugene Lang College",               state: "NY", type: "Private", lean: "Very Liberal", notes: "Part of The New School, progressive arts focus" },
  { name: "New College of Florida",            state: "FL", type: "Public",  lean: "Very Liberal", notes: "Was extremely liberal before DeSantis takeover" },
  { name: "Marlboro College",                  state: "VT", type: "Private", lean: "Very Liberal", notes: "Very small, progressive, student-run" },
  { name: "Deep Springs College",              state: "CA", type: "Private", lean: "Very Liberal", notes: "All-male, remote, self-governed, progressive" },
  { name: "Prescott College",                  state: "AZ", type: "Private", lean: "Very Liberal", notes: "Environmental justice focus" },
  { name: "Naropa University",                 state: "CO", type: "Private", lean: "Very Liberal", notes: "Buddhist-inspired, contemplative arts" },

  // ── LIBERAL ───────────────────────────────────────────────────────────────
  { name: "Amherst College",                   state: "MA", type: "Private", lean: "Liberal", notes: "Strong liberal arts, progressive tradition" },
  { name: "American University",               state: "DC", type: "Private", lean: "Liberal", notes: "Very political campus, DC liberal" },
  { name: "Boston University",                 state: "MA", type: "Private", lean: "Liberal", notes: "Research university, liberal faculty" },
  { name: "Bowdoin College",                   state: "ME", type: "Private", lean: "Liberal", notes: "Strong environmental + social focus" },
  { name: "Columbia University",               state: "NY", type: "Private", lean: "Liberal", notes: "NYC liberal bastion, social justice culture" },
  { name: "Cornell University",                state: "NY", type: "Private", lean: "Liberal", notes: "Most moderate Ivy, engineering-heavy" },
  { name: "Dartmouth College",                 state: "NH", type: "Private", lean: "Liberal", notes: "Most conservative Ivy — still liberal" },
  { name: "DePaul University",                 state: "IL", type: "Private", lean: "Liberal", notes: "Catholic but politically liberal students" },
  { name: "Duke University",                   state: "NC", type: "Private", lean: "Liberal", notes: "Progressive, activist students" },
  { name: "Emory University",                  state: "GA", type: "Private", lean: "Liberal", notes: "Atlanta elite, liberal arts powerhouse" },
  { name: "Fordham University",                state: "NY", type: "Private", lean: "Liberal", notes: "Jesuit Catholic, NYC liberal students" },
  { name: "Georgetown University",             state: "DC", type: "Private", lean: "Liberal", notes: "Jesuit Catholic, DC liberal students" },
  { name: "George Washington University",      state: "DC", type: "Private", lean: "Liberal", notes: "DC politics, government-focused liberal" },
  { name: "Harvard University",                state: "MA", type: "Private", lean: "Liberal", notes: "Faculty and admin heavily left-leaning" },
  { name: "Howard University",                 state: "DC", type: "Private", lean: "Liberal", notes: "Prestigious HBCU, progressive politics" },
  { name: "Ithaca College",                    state: "NY", type: "Private", lean: "Liberal", notes: "Media + arts, progressive culture" },
  { name: "Johns Hopkins University",          state: "MD", type: "Private", lean: "Liberal", notes: "Research-heavy, moderate-liberal" },
  { name: "Middlebury College",                state: "VT", type: "Private", lean: "Liberal", notes: "Environmental focus, deplatforming incident" },
  { name: "MIT",                               state: "MA", type: "Private", lean: "Liberal", notes: "STEM-heavy but liberal faculty majority" },
  { name: "Morehouse College",                 state: "GA", type: "Private", lean: "Liberal", notes: "HBCU, progressive, MLK's alma mater" },
  { name: "Northeastern University",           state: "MA", type: "Private", lean: "Liberal", notes: "Co-op focused, liberal faculty" },
  { name: "Northwestern University",           state: "IL", type: "Private", lean: "Liberal", notes: "Liberal but career-focused" },
  { name: "NYU",                               state: "NY", type: "Private", lean: "Liberal", notes: "NYC liberal, arts and media hub" },
  { name: "Portland State University",         state: "OR", type: "Public",  lean: "Liberal", notes: "Urban, progressive" },
  { name: "Princeton University",              state: "NJ", type: "Private", lean: "Liberal", notes: "More moderate than peers, still liberal" },
  { name: "Rutgers University",                state: "NJ", type: "Public",  lean: "Liberal", notes: "NJ public flagship, progressive" },
  { name: "San Francisco State University",    state: "CA", type: "Public",  lean: "Liberal", notes: "Very liberal, ethnic studies pioneer" },
  { name: "Spelman College",                   state: "GA", type: "Private", lean: "Liberal", notes: "Women's HBCU, activist tradition" },
  { name: "Stanford University",               state: "CA", type: "Private", lean: "Liberal", notes: "Silicon Valley liberal elite" },
  { name: "Tufts University",                  state: "MA", type: "Private", lean: "Liberal", notes: "Global affairs focus, liberal" },
  { name: "UC Davis",                          state: "CA", type: "Public",  lean: "Liberal", notes: "Ag + environment focus, liberal" },
  { name: "UC Irvine",                         state: "CA", type: "Public",  lean: "Liberal", notes: "Diverse, politically liberal" },
  { name: "UC San Diego",                      state: "CA", type: "Public",  lean: "Liberal", notes: "STEM-heavy but liberal campus" },
  { name: "UC Santa Barbara",                  state: "CA", type: "Public",  lean: "Liberal", notes: "Beach campus, socially liberal" },
  { name: "UCLA",                              state: "CA", type: "Public",  lean: "Liberal", notes: "Large public, liberal faculty and students" },
  { name: "UMass Amherst",                     state: "MA", type: "Public",  lean: "Liberal", notes: "ZooMass, liberal New England campus" },
  { name: "University of Colorado Boulder",    state: "CO", type: "Public",  lean: "Liberal", notes: "Outdoorsy + liberal politics" },
  { name: "University of Illinois UC",         state: "IL", type: "Public",  lean: "Liberal", notes: "Big Ten, research-heavy, moderate-liberal" },
  { name: "University of Maryland",            state: "MD", type: "Public",  lean: "Liberal", notes: "DC area influence, liberal flagship" },
  { name: "University of Michigan",            state: "MI", type: "Public",  lean: "Liberal", notes: "Big Ten flagship, strong liberal tradition" },
  { name: "University of Minnesota",           state: "MN", type: "Public",  lean: "Liberal", notes: "Liberal, union-friendly state flagship" },
  { name: "University of Oregon",              state: "OR", type: "Public",  lean: "Liberal", notes: "Ducks football + strong campus activism" },
  { name: "University of Pennsylvania",        state: "PA", type: "Private", lean: "Liberal", notes: "Wharton business + liberal arts mix" },
  { name: "University of Southern California", state: "CA", type: "Private", lean: "Liberal", notes: "LA liberal, film and business mix" },
  { name: "University of Vermont",             state: "VT", type: "Public",  lean: "Liberal", notes: "Bernie Sanders country" },
  { name: "University of Washington",          state: "WA", type: "Public",  lean: "Liberal", notes: "Pacific NW liberal flagship" },
  { name: "University of Wisconsin-Madison",   state: "WI", type: "Public",  lean: "Liberal", notes: "Progressive tradition, union-friendly" },
  { name: "Yale University",                   state: "CT", type: "Private", lean: "Liberal", notes: "Left-leaning Ivy, strong campus activism" },
  { name: "Hofstra University",                state: "NY", type: "Private", lean: "Liberal", notes: "Long Island school, liberal arts leaning" },
  { name: "Adelphi University",                state: "NY", type: "Private", lean: "Liberal", notes: "Garden City NY, socially progressive" },
  { name: "Binghamton University",             state: "NY", type: "Public",  lean: "Liberal", notes: "SUNY flagship, politically liberal" },
  { name: "SUNY Albany",                       state: "NY", type: "Public",  lean: "Liberal", notes: "Public research university, progressive" },
  { name: "SUNY Buffalo",                      state: "NY", type: "Public",  lean: "Liberal", notes: "Large public, union-friendly city" },
  { name: "Stony Brook University",            state: "NY", type: "Public",  lean: "Liberal", notes: "STEM powerhouse, liberal campus" },
  { name: "New School",                        state: "NY", type: "Private", lean: "Liberal", notes: "Progressive arts and social sciences" },
  { name: "Hunter College",                    state: "NY", type: "Public",  lean: "Liberal", notes: "CUNY flagship, very diverse and liberal" },
  { name: "Brooklyn College",                  state: "NY", type: "Public",  lean: "Liberal", notes: "CUNY school, politically active" },
  { name: "Drexel University",                 state: "PA", type: "Private", lean: "Liberal", notes: "Philadelphia, co-op focused, moderate-liberal" },
  { name: "Temple University",                 state: "PA", type: "Public",  lean: "Liberal", notes: "Philly public, diverse and liberal" },
  { name: "University of Pittsburgh",          state: "PA", type: "Public",  lean: "Liberal", notes: "Research university, moderate-liberal" },
  { name: "University of Connecticut",         state: "CT", type: "Public",  lean: "Liberal", notes: "New England flagship, moderate-liberal" },
  { name: "University of Rhode Island",        state: "RI", type: "Public",  lean: "Liberal", notes: "New England public, liberal" },
  { name: "University of New Hampshire",       state: "NH", type: "Public",  lean: "Liberal", notes: "Liberal arts flagship, New England" },
  { name: "University of Maine",               state: "ME", type: "Public",  lean: "Liberal", notes: "Maine flagship, moderate-liberal" },
  { name: "Colby College",                     state: "ME", type: "Private", lean: "Liberal", notes: "Small liberal arts, environmentally focused" },
  { name: "Bates College",                     state: "ME", type: "Private", lean: "Liberal", notes: "New England liberal arts, activist tradition" },
  { name: "Colgate University",                state: "NY", type: "Private", lean: "Liberal", notes: "Liberal arts, more moderate than peers" },
  { name: "Hamilton College",                  state: "NY", type: "Private", lean: "Liberal", notes: "Upstate NY liberal arts" },
  { name: "Trinity College",                   state: "CT", type: "Private", lean: "Liberal", notes: "Hartford CT, liberal arts tradition" },
  { name: "Skidmore College",                  state: "NY", type: "Private", lean: "Liberal", notes: "Saratoga Springs, arts + liberal politics" },
  { name: "Union College",                     state: "NY", type: "Private", lean: "Liberal", notes: "Schenectady NY, moderate-liberal" },
  { name: "Hobart and William Smith Colleges", state: "NY", type: "Private", lean: "Liberal", notes: "Geneva NY, progressive liberal arts" },
  { name: "New York University Abu Dhabi",     state: "NY", type: "Private", lean: "Liberal", notes: "Global campus, very international" },
  { name: "Hampshire College",                 state: "MA", type: "Private", lean: "Liberal", notes: "No grades, self-designed majors" },
  { name: "Wheaton College",                   state: "MA", type: "Private", lean: "Liberal", notes: "Norton MA women's college (now coed)" },
  { name: "Clark University",                  state: "MA", type: "Private", lean: "Liberal", notes: "Worcester MA, social justice focus" },
  { name: "Brandeis University",               state: "MA", type: "Private", lean: "Liberal", notes: "Founded for Jewish community, very liberal" },
  { name: "Simmons University",                state: "MA", type: "Private", lean: "Liberal", notes: "Women-focused, progressive Boston school" },
  { name: "Babson College",                    state: "MA", type: "Private", lean: "Liberal", notes: "Entrepreneurship focus, moderate-liberal" },
  { name: "Emerson College",                   state: "MA", type: "Private", lean: "Liberal", notes: "Communications + arts, very liberal" },
  { name: "Suffolk University",                state: "MA", type: "Private", lean: "Liberal", notes: "Boston, law + business, moderate" },
  { name: "University of Massachusetts Lowell",state: "MA", type: "Public",  lean: "Liberal", notes: "Engineering + arts, moderate-liberal" },
  { name: "Quinnipiac University",             state: "CT", type: "Private", lean: "Liberal", notes: "Health + journalism, moderate-liberal" },
  { name: "Sacred Heart University",           state: "CT", type: "Private", lean: "Liberal", notes: "Catholic, moderate-liberal" },
  { name: "Fairfield University",              state: "CT", type: "Private", lean: "Liberal", notes: "Jesuit, moderate" },
  { name: "University of Hartford",            state: "CT", type: "Private", lean: "Liberal", notes: "Diverse, moderate-liberal" },
  { name: "Lehigh University",                 state: "PA", type: "Private", lean: "Liberal", notes: "Engineering + business, moderate" },
  { name: "Villanova University",              state: "PA", type: "Private", lean: "Liberal", notes: "Augustinian Catholic, moderate" },
  { name: "LaSalle University",                state: "PA", type: "Private", lean: "Liberal", notes: "Catholic, Philly, moderate" },
  { name: "University of Delaware",            state: "DE", type: "Public",  lean: "Liberal", notes: "Mid-Atlantic public, moderate-liberal" },
  { name: "Towson University",                 state: "MD", type: "Public",  lean: "Liberal", notes: "Baltimore area, moderate-liberal" },
  { name: "American University DC",            state: "DC", type: "Private", lean: "Liberal", notes: "Very politically active campus" },
  { name: "George Washington University",      state: "DC", type: "Private", lean: "Liberal", notes: "DC power corridor, liberal" },
  { name: "University of Baltimore",           state: "MD", type: "Public",  lean: "Liberal", notes: "Urban, law + business, moderate" },
  { name: "Loyola University Maryland",        state: "MD", type: "Private", lean: "Liberal", notes: "Jesuit, Baltimore, moderate" },
  { name: "University of North Carolina",      state: "NC", type: "Public",  lean: "Liberal", notes: "UNC system flagship, liberal" },
  { name: "Appalachian State University",      state: "NC", type: "Public",  lean: "Liberal", notes: "Boone NC, progressive outdoor culture" },
  { name: "Warren Wilson College",             state: "NC", type: "Private", lean: "Liberal", notes: "Progressive, environmental focus" },
  { name: "Elon University",                   state: "NC", type: "Private", lean: "Liberal", notes: "Communications focus, moderate-liberal" },
  { name: "University of South Florida",       state: "FL", type: "Public",  lean: "Liberal", notes: "Tampa Bay, diverse, moderate-liberal" },
  { name: "Florida International University",  state: "FL", type: "Public",  lean: "Liberal", notes: "Miami, very diverse, moderate-liberal" },
  { name: "University of Central Florida",     state: "FL", type: "Public",  lean: "Liberal", notes: "Orlando, large diverse campus" },
  { name: "Rollins College",                   state: "FL", type: "Private", lean: "Liberal", notes: "Winter Park FL, liberal arts, progressive" },
  { name: "Tulane University",                 state: "LA", type: "Private", lean: "Liberal", notes: "NOLA culture, progressive" },
  { name: "Loyola University New Orleans",     state: "LA", type: "Private", lean: "Liberal", notes: "Jesuit, NOLA liberal" },
  { name: "Rhodes College",                    state: "TN", type: "Private", lean: "Liberal", notes: "Memphis, moderate-liberal" },
  { name: "Belmont University",                state: "TN", type: "Private", lean: "Liberal", notes: "Nashville arts, moderate" },
  { name: "University of Tennessee-Knoxville", state: "TN", type: "Public",  lean: "Liberal", notes: "Research university, moderate-liberal" },
  { name: "Middle Tennessee State University", state: "TN", type: "Public",  lean: "Liberal", notes: "MTSU, large public, moderate" },

  // ── MODERATE ──────────────────────────────────────────────────────────────
  { name: "Arizona State University",          state: "AZ", type: "Public",  lean: "Moderate", notes: "Large, diverse political views" },
  { name: "Boston College",                    state: "MA", type: "Private", lean: "Moderate", notes: "Jesuit Catholic, moderate" },
  { name: "Carnegie Mellon University",        state: "PA", type: "Private", lean: "Moderate", notes: "STEM/arts, politically moderate" },
  { name: "Case Western Reserve University",   state: "OH", type: "Private", lean: "Moderate", notes: "STEM + med, politically moderate" },
  { name: "Colorado State University",         state: "CO", type: "Public",  lean: "Moderate", notes: "Ag + engineering, moderate" },
  { name: "Florida State University",          state: "FL", type: "Public",  lean: "Moderate", notes: "Mixed, moderate" },
  { name: "George Mason University",           state: "VA", type: "Public",  lean: "Moderate", notes: "Libertarian economics (Mercatus Center)" },
  { name: "Georgia Tech",                      state: "GA", type: "Public",  lean: "Moderate", notes: "STEM-heavy, politically moderate" },
  { name: "Indiana University",                state: "IN", type: "Public",  lean: "Moderate", notes: "Arts and sciences, moderate" },
  { name: "Iowa State University",             state: "IA", type: "Public",  lean: "Moderate", notes: "Agriculture state school, moderate" },
  { name: "Michigan State University",         state: "MI", type: "Public",  lean: "Moderate", notes: "Agriculture + liberal arts, mixed" },
  { name: "NC State University",               state: "NC", type: "Public",  lean: "Moderate", notes: "Engineering/ag, moderate" },
  { name: "Ohio State University",             state: "OH", type: "Public",  lean: "Moderate", notes: "Big Ten, mixed political views" },
  { name: "Pennsylvania State University",     state: "PA", type: "Public",  lean: "Moderate", notes: "Engineering/business heavy, mixed" },
  { name: "Purdue University",                 state: "IN", type: "Public",  lean: "Moderate", notes: "STEM/agriculture, politically moderate" },
  { name: "Rensselaer Polytechnic Institute",  state: "NY", type: "Private", lean: "Moderate", notes: "STEM-heavy, moderate" },
  { name: "Southern Methodist University",     state: "TX", type: "Private", lean: "Moderate", notes: "Business-focused, moderate-conservative" },
  { name: "Texas Christian University",        state: "TX", type: "Private", lean: "Moderate", notes: "Christian + football culture, moderate" },
  { name: "Tulane University",                 state: "LA", type: "Private", lean: "Moderate", notes: "NOLA culture, moderate" },
  { name: "University of Arizona",             state: "AZ", type: "Public",  lean: "Moderate", notes: "Border state, mixed politics" },
  { name: "University of Chicago",             state: "IL", type: "Private", lean: "Moderate", notes: "Free speech tradition, libertarian economics" },
  { name: "University of Florida",             state: "FL", type: "Public",  lean: "Moderate", notes: "DeSantis-era influence, moderate" },
  { name: "University of Kansas",              state: "KS", type: "Public",  lean: "Moderate", notes: "State flagship, moderate-liberal" },
  { name: "University of Kentucky",            state: "KY", type: "Public",  lean: "Moderate", notes: "SEC school, moderate" },
  { name: "University of Miami",               state: "FL", type: "Private", lean: "Moderate", notes: "Business-friendly, moderate" },
  { name: "University of Missouri",            state: "MO", type: "Public",  lean: "Moderate", notes: "Mixed, research university" },
  { name: "University of Notre Dame",          state: "IN", type: "Private", lean: "Moderate", notes: "Catholic tradition, moderate to conservative" },
  { name: "University of Pittsburgh",          state: "PA", type: "Public",  lean: "Moderate", notes: "Research university, moderate-liberal" },
  { name: "University of Virginia",            state: "VA", type: "Public",  lean: "Moderate", notes: "Founded by Jefferson, moderate tradition" },
  { name: "Vanderbilt University",             state: "TN", type: "Private", lean: "Moderate", notes: "Southern elite, moderate" },
  { name: "Virginia Tech",                     state: "VA", type: "Public",  lean: "Moderate", notes: "STEM focus, moderate-conservative" },
  { name: "Wake Forest University",            state: "NC", type: "Private", lean: "Moderate", notes: "Business + liberal arts, moderate" },
  { name: "Marquette University",              state: "WI", type: "Private", lean: "Moderate", notes: "Jesuit Catholic, moderate" },
  { name: "Xavier University",                 state: "OH", type: "Private", lean: "Moderate", notes: "Jesuit, Cincinnati, moderate" },
  { name: "Creighton University",              state: "NE", type: "Private", lean: "Moderate", notes: "Jesuit, Omaha, moderate" },
  { name: "Gonzaga University",                state: "WA", type: "Private", lean: "Moderate", notes: "Jesuit, Spokane, basketball + moderate politics" },
  { name: "Villanova University",              state: "PA", type: "Private", lean: "Moderate", notes: "Augustinian Catholic, moderate" },
  { name: "Loyola University Chicago",         state: "IL", type: "Private", lean: "Moderate", notes: "Jesuit, Chicago, moderate" },
  { name: "Saint Louis University",            state: "MO", type: "Private", lean: "Moderate", notes: "Jesuit, moderate" },
  { name: "DePauw University",                 state: "IN", type: "Private", lean: "Moderate", notes: "Liberal arts, moderate" },
  { name: "Denison University",                state: "OH", type: "Private", lean: "Moderate", notes: "Liberal arts, moderate" },
  { name: "Kenyon College",                    state: "OH", type: "Private", lean: "Moderate", notes: "Strong writing program, moderate-liberal" },
  { name: "Ohio Wesleyan University",          state: "OH", type: "Private", lean: "Moderate", notes: "Liberal arts, moderate" },
  { name: "Wittenberg University",             state: "OH", type: "Private", lean: "Moderate", notes: "Lutheran, moderate" },
  { name: "Dickinson College",                 state: "PA", type: "Private", lean: "Moderate", notes: "Carlisle PA, international focus, moderate-liberal" },
  { name: "Gettysburg College",                state: "PA", type: "Private", lean: "Moderate", notes: "Lutheran, moderate" },
  { name: "Franklin & Marshall College",       state: "PA", type: "Private", lean: "Moderate", notes: "Lancaster PA, moderate" },
  { name: "Muhlenberg College",                state: "PA", type: "Private", lean: "Moderate", notes: "Lutheran, Allentown PA, moderate" },
  { name: "Bucknell University",               state: "PA", type: "Private", lean: "Moderate", notes: "Engineering + arts, moderate" },
  { name: "Lafayette College",                 state: "PA", type: "Private", lean: "Moderate", notes: "Easton PA, moderate" },
  { name: "University of Richmond",            state: "VA", type: "Private", lean: "Moderate", notes: "Business + law, moderate" },
  { name: "Washington and Lee University",     state: "VA", type: "Private", lean: "Moderate", notes: "Southern elite, moderate-conservative" },
  { name: "College of William & Mary",         state: "VA", type: "Public",  lean: "Moderate", notes: "Virginia's oldest, moderate" },
  { name: "James Madison University",          state: "VA", type: "Public",  lean: "Moderate", notes: "Shenandoah Valley, moderate" },
  { name: "Furman University",                 state: "SC", type: "Private", lean: "Moderate", notes: "Baptist heritage, now moderate" },
  { name: "Davidson College",                  state: "NC", type: "Private", lean: "Moderate", notes: "Presbyterian heritage, moderate" },
  { name: "Wofford College",                   state: "SC", type: "Private", lean: "Moderate", notes: "Methodist, small, moderate" },
  { name: "University of Georgia",             state: "GA", type: "Public",  lean: "Moderate", notes: "Bulldog nation, moderate-conservative" },
  { name: "Mercer University",                 state: "GA", type: "Private", lean: "Moderate", notes: "Baptist, moderate" },
  { name: "Georgia State University",          state: "GA", type: "Public",  lean: "Moderate", notes: "Atlanta urban, diverse, moderate" },
  { name: "Kennesaw State University",         state: "GA", type: "Public",  lean: "Moderate", notes: "Large suburban, moderate" },
  { name: "University of Louisville",          state: "KY", type: "Public",  lean: "Moderate", notes: "Urban public, moderate" },
  { name: "Western Kentucky University",       state: "KY", type: "Public",  lean: "Moderate", notes: "Bowling Green, moderate" },
  { name: "University of Arkansas",            state: "AR", type: "Public",  lean: "Moderate", notes: "Fayetteville, moderate-conservative" },
  { name: "Missouri State University",         state: "MO", type: "Public",  lean: "Moderate", notes: "Springfield, moderate" },
  { name: "Drake University",                  state: "IA", type: "Private", lean: "Moderate", notes: "Des Moines, journalism + law, moderate" },
  { name: "University of Iowa",                state: "IA", type: "Public",  lean: "Moderate", notes: "Iowa City, Big Ten, moderate-liberal" },
  { name: "University of Nebraska",            state: "NE", type: "Public",  lean: "Moderate", notes: "Lincoln, moderate-conservative" },
  { name: "Kansas State University",           state: "KS", type: "Public",  lean: "Moderate", notes: "Manhattan KS, ag + engineering, moderate" },
  { name: "University of South Dakota",        state: "SD", type: "Public",  lean: "Moderate", notes: "Vermillion, moderate" },
  { name: "North Dakota State University",     state: "ND", type: "Public",  lean: "Moderate", notes: "Fargo, ag + engineering, moderate" },
  { name: "University of Wyoming",             state: "WY", type: "Public",  lean: "Moderate", notes: "Laramie, moderate-conservative" },
  { name: "Montana State University",          state: "MT", type: "Public",  lean: "Moderate", notes: "Bozeman, ag + engineering, moderate" },
  { name: "University of Montana",             state: "MT", type: "Public",  lean: "Moderate", notes: "Missoula, moderate-liberal" },
  { name: "Boise State University",            state: "ID", type: "Public",  lean: "Moderate", notes: "Urban Idaho campus, moderate" },
  { name: "University of Nevada-Las Vegas",    state: "NV", type: "Public",  lean: "Moderate", notes: "Casino city, diverse, moderate" },
  { name: "University of Nevada-Reno",         state: "NV", type: "Public",  lean: "Moderate", notes: "Mountain West, moderate" },
  { name: "University of New Mexico",          state: "NM", type: "Public",  lean: "Moderate", notes: "Albuquerque, diverse, moderate-liberal" },
  { name: "New Mexico State University",       state: "NM", type: "Public",  lean: "Moderate", notes: "Las Cruces, ag + engineering, moderate" },
  { name: "Utah State University",             state: "UT", type: "Public",  lean: "Moderate", notes: "Logan, ag school, moderate-conservative" },
  { name: "University of Hawaii-Manoa",        state: "HI", type: "Public",  lean: "Moderate", notes: "Honolulu, diverse, moderate-liberal" },
  { name: "University of Alaska Fairbanks",    state: "AK", type: "Public",  lean: "Moderate", notes: "Remote, research-focused, moderate" },
  { name: "Oregon State University",           state: "OR", type: "Public",  lean: "Moderate", notes: "Corvallis, STEM + ag, moderate" },
  { name: "Washington State University",       state: "WA", type: "Public",  lean: "Moderate", notes: "Pullman, ag + engineering, moderate" },
  { name: "University of Idaho",               state: "ID", type: "Public",  lean: "Moderate", notes: "Moscow ID, moderate" },

  // ── CONSERVATIVE ──────────────────────────────────────────────────────────
  { name: "Auburn University",                 state: "AL", type: "Public",  lean: "Conservative", notes: "Football culture, conservative tradition" },
  { name: "Ave Maria University",              state: "FL", type: "Private", lean: "Conservative", notes: "Catholic orthodoxy, traditional values" },
  { name: "Baylor University",                 state: "TX", type: "Private", lean: "Conservative", notes: "Baptist university, conservative values" },
  { name: "Benedictine College",               state: "KS", type: "Private", lean: "Conservative", notes: "Catholic, strong athletics program" },
  { name: "Brigham Young University",          state: "UT", type: "Private", lean: "Conservative", notes: "LDS church-owned, strict honor code" },
  { name: "Brigham Young University-Idaho",    state: "ID", type: "Private", lean: "Conservative", notes: "LDS church-owned, very conservative" },
  { name: "Cedarville University",             state: "OH", type: "Private", lean: "Conservative", notes: "Baptist, conservative" },
  { name: "Clemson University",                state: "SC", type: "Public",  lean: "Conservative", notes: "Football + engineering, conservative" },
  { name: "Franciscan University Steubenville",state: "OH", type: "Private", lean: "Conservative", notes: "Catholic charismatic, conservative" },
  { name: "Gordon College",                    state: "MA", type: "Private", lean: "Conservative", notes: "Evangelical, traditional values" },
  { name: "Grove City College",                state: "PA", type: "Private", lean: "Conservative", notes: "Christian, refuses federal funding" },
  { name: "Hillsdale College",                 state: "MI", type: "Private", lean: "Conservative", notes: "Classical liberal arts, free market" },
  { name: "Louisiana State University",        state: "LA", type: "Public",  lean: "Conservative", notes: "SEC Tigers, Southern conservative" },
  { name: "Mississippi State University",      state: "MS", type: "Public",  lean: "Conservative", notes: "Ag + engineering, conservative" },
  { name: "Oklahoma State University",         state: "OK", type: "Public",  lean: "Conservative", notes: "Agriculture + engineering, conservative" },
  { name: "Pepperdine University",             state: "CA", type: "Private", lean: "Conservative", notes: "Churches of Christ, conservative" },
  { name: "Samford University",                state: "AL", type: "Private", lean: "Conservative", notes: "Baptist, conservative" },
  { name: "Texas A&M University",              state: "TX", type: "Public",  lean: "Conservative", notes: "Aggie tradition, military culture" },
  { name: "University of Alabama",             state: "AL", type: "Public",  lean: "Conservative", notes: "Greek life dominant, conservative" },
  { name: "University of Arkansas",            state: "AR", type: "Public",  lean: "Conservative", notes: "Razorbacks, conservative" },
  { name: "University of Georgia",             state: "GA", type: "Public",  lean: "Conservative", notes: "UGA Bulldogs, moderate-conservative" },
  { name: "University of Mississippi",         state: "MS", type: "Public",  lean: "Conservative", notes: "Ole Miss, Southern conservative" },
  { name: "University of Nebraska-Lincoln",    state: "NE", type: "Public",  lean: "Conservative", notes: "Cornhuskers, conservative state flagship" },
  { name: "University of Oklahoma",            state: "OK", type: "Public",  lean: "Conservative", notes: "Sooners, conservative" },
  { name: "University of South Carolina",      state: "SC", type: "Public",  lean: "Conservative", notes: "Southern state school, conservative" },
  { name: "University of Tennessee",           state: "TN", type: "Public",  lean: "Conservative", notes: "SEC Volunteers, conservative state" },
  { name: "University of Utah",                state: "UT", type: "Public",  lean: "Conservative", notes: "LDS influence, conservative state" },
  { name: "Wheaton College",                   state: "IL", type: "Private", lean: "Conservative", notes: "Evangelical, strict honor code" },
  { name: "University of Texas at Austin",     state: "TX", type: "Public",  lean: "Conservative", notes: "UT Longhorns, Texas conservative culture" },
  { name: "Texas Tech University",             state: "TX", type: "Public",  lean: "Conservative", notes: "Lubbock, conservative West Texas" },
  { name: "University of North Texas",         state: "TX", type: "Public",  lean: "Conservative", notes: "Denton TX, moderate-conservative" },
  { name: "Baylor University",                 state: "TX", type: "Private", lean: "Conservative", notes: "Baptist, conservative values" },
  { name: "Abilene Christian University",      state: "TX", type: "Private", lean: "Conservative", notes: "Church of Christ, conservative" },
  { name: "Lipscomb University",               state: "TN", type: "Private", lean: "Conservative", notes: "Church of Christ, Nashville, conservative" },
  { name: "Freed-Hardeman University",         state: "TN", type: "Private", lean: "Conservative", notes: "Church of Christ, very conservative" },
  { name: "Harding University",                state: "AR", type: "Private", lean: "Conservative", notes: "Church of Christ, conservative" },
  { name: "John Brown University",             state: "AR", type: "Private", lean: "Conservative", notes: "Interdenominational Christian, conservative" },
  { name: "Oklahoma Baptist University",       state: "OK", type: "Private", lean: "Conservative", notes: "Baptist, conservative" },
  { name: "Oral Roberts University",           state: "OK", type: "Private", lean: "Conservative", notes: "Pentecostal/evangelical, conservative" },
  { name: "Southern Nazarene University",      state: "OK", type: "Private", lean: "Conservative", notes: "Nazarene Church, conservative" },
  { name: "Arkansas State University",         state: "AR", type: "Public",  lean: "Conservative", notes: "Jonesboro, moderate-conservative" },
  { name: "Murray State University",           state: "KY", type: "Public",  lean: "Conservative", notes: "Western Kentucky, moderate-conservative" },
  { name: "Eastern Kentucky University",       state: "KY", type: "Public",  lean: "Conservative", notes: "Coal country, very conservative" },
  { name: "Marshall University",               state: "WV", type: "Public",  lean: "Conservative", notes: "Huntington WV, conservative tradition" },
  { name: "West Virginia University",          state: "WV", type: "Public",  lean: "Conservative", notes: "Morgantown, moderate-conservative" },
  { name: "University of South Alabama",       state: "AL", type: "Public",  lean: "Conservative", notes: "Mobile, moderate-conservative" },
  { name: "Jacksonville State University",     state: "AL", type: "Public",  lean: "Conservative", notes: "Alabama, conservative" },
  { name: "University of Georgia",             state: "GA", type: "Public",  lean: "Conservative", notes: "Athens GA, conservative flagship" },
  { name: "Georgia Southern University",       state: "GA", type: "Public",  lean: "Conservative", notes: "Statesboro, moderate-conservative" },
  { name: "Louisiana Tech University",         state: "LA", type: "Public",  lean: "Conservative", notes: "Ruston, conservative" },
  { name: "Nicholls State University",         state: "LA", type: "Public",  lean: "Conservative", notes: "Thibodaux LA, conservative" },
  { name: "University of Southern Mississippi",state: "MS", type: "Public",  lean: "Conservative", notes: "Hattiesburg, conservative" },
  { name: "Wheaton College",                   state: "IL", type: "Private", lean: "Conservative", notes: "Evangelical flagship in Illinois" },

  // ── VERY CONSERVATIVE ─────────────────────────────────────────────────────
  { name: "Belmont Abbey College",             state: "NC", type: "Private", lean: "Very Conservative", notes: "Refused ACA contraception mandate, Benedictine" },
  { name: "Bob Jones University",              state: "SC", type: "Private", lean: "Very Conservative", notes: "Fundamentalist Baptist, strict campus rules" },
  { name: "Christendom College",               state: "VA", type: "Private", lean: "Very Conservative", notes: "Catholic traditional, very orthodox" },
  { name: "Dallas Baptist University",         state: "TX", type: "Private", lean: "Very Conservative", notes: "Baptist, evangelical conservative" },
  { name: "John Paul the Great Catholic Univ.",state: "CA", type: "Private", lean: "Very Conservative", notes: "Media + orthodox Catholicism" },
  { name: "Lee University",                    state: "TN", type: "Private", lean: "Very Conservative", notes: "Church of God, evangelical" },
  { name: "Liberty University",                state: "VA", type: "Private", lean: "Very Conservative", notes: "Evangelical flagship, founded by Jerry Falwell Sr." },
  { name: "Oral Roberts University",           state: "OK", type: "Private", lean: "Very Conservative", notes: "Pentecostal/evangelical, conservative" },
  { name: "Patrick Henry College",             state: "VA", type: "Private", lean: "Very Conservative", notes: "Christian homeschool-focused, political training ground" },
  { name: "Regent University",                 state: "VA", type: "Private", lean: "Very Conservative", notes: "Pat Robertson's school, evangelical" },
  { name: "Thomas Aquinas College",            state: "CA", type: "Private", lean: "Very Conservative", notes: "Great books, orthodox Catholic tradition" },
  { name: "Union University",                  state: "TN", type: "Private", lean: "Very Conservative", notes: "Southern Baptist, conservative" },
  { name: "University of Dallas",              state: "TX", type: "Private", lean: "Very Conservative", notes: "Catholic great books, classical tradition" },
  { name: "Wyoming Catholic College",          state: "WY", type: "Private", lean: "Very Conservative", notes: "Catholic, no cell phones, wilderness formation" },
  { name: "Magdalen College",                  state: "NH", type: "Private", lean: "Very Conservative", notes: "Catholic great books, very orthodox" },
  { name: "Holy Apostles College",             state: "CT", type: "Private", lean: "Very Conservative", notes: "Catholic seminary, very traditional" },
  { name: "Ave Maria University",              state: "FL", type: "Private", lean: "Very Conservative", notes: "Tom Monaghan founded, orthodox Catholic" },
  { name: "Hillsdale College",                 state: "MI", type: "Private", lean: "Very Conservative", notes: "No federal funding, constitution-focused" },
  { name: "Grove City College",                state: "PA", type: "Private", lean: "Very Conservative", notes: "Refuses federal aid, Christian conservative" },
  { name: "Bryan College",                     state: "TN", type: "Private", lean: "Very Conservative", notes: "Fundamentalist Christian, named after William Jennings Bryan" },
  { name: "Pensacola Christian College",       state: "FL", type: "Private", lean: "Very Conservative", notes: "Strict rules, fundamentalist Baptist" },
];

const ALL_STATES = [...new Set(COLLEGES.map((c) => c.state))].sort();

const LEAN_ORDER = { "Very Liberal": 0, "Liberal": 1, "Moderate": 2, "Conservative": 3, "Very Conservative": 4 };

const COUNTS = LEANS.reduce((acc, l) => {
  acc[l] = COLLEGES.filter((c) => c.lean === l).length;
  return acc;
}, {});

export default function LiberalVsConservative() {
  const [search, setSearch] = useState("");
  const [leanFilter, setLeanFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return COLLEGES.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q) && !c.state.toLowerCase().includes(q) && !c.notes.toLowerCase().includes(q)) return false;
      if (leanFilter !== "All" && c.lean !== leanFilter) return false;
      if (typeFilter !== "All" && c.type !== typeFilter) return false;
      if (stateFilter !== "All" && c.state !== stateFilter) return false;
      return true;
    }).sort((a, b) => {
      const lo = LEAN_ORDER[a.lean] - LEAN_ORDER[b.lean];
      if (lo !== 0) return lo;
      return a.name.localeCompare(b.name);
    });
  }, [search, leanFilter, typeFilter, stateFilter]);

  return (
    <Layout>
      <SEO
        title="Liberal vs Conservative Colleges | IHateCollege.com"
        description={`Search ${COLLEGES.length}+ colleges by political lean. Know what you're walking into before you spend a dollar.`}
        keywords="liberal colleges, conservative colleges, college political lean, most liberal universities, most conservative colleges, political campus culture"
      />

      {/* HERO */}
      <section className="relative py-14 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_65%)] pointer-events-none" />
        <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-3">Know Before You Go</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          Liberal vs Conservative<br />
          <span className="text-purple-300">College Breakdown</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          {COLLEGES.length}+ colleges ranked by political lean. Search, filter by state, and know exactly what campus culture you're walking into.
        </p>
      </section>

      {/* LEAN STATS BAR */}
      <section className="max-w-5xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-5 gap-2 text-center">
          {LEANS.map((l) => {
            const s = LEAN_STYLES[l];
            return (
              <button
                key={l}
                onClick={() => setLeanFilter(leanFilter === l ? "All" : l)}
                className={`rounded-xl p-3 border transition-all ${
                  leanFilter === l
                    ? `${s.badge} border-transparent`
                    : "bg-slate-900 border-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-lg font-black text-white">{COUNTS[l]}</div>
                <div className={`text-[10px] leading-tight font-semibold ${leanFilter === l ? "text-white/80" : "text-slate-400"}`}>{l}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-4 pb-6">
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search by school name, state, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">✕</button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex flex-wrap gap-1.5">
            {["All", ...LEANS].map((l) => (
              <button
                key={l}
                onClick={() => setLeanFilter(l)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                  leanFilter === l
                    ? `${PILL_ACTIVE[l]} border-transparent`
                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                {l === "All" ? "All Leans" : l}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-slate-700 hidden sm:block" />

          {["All", "Public", "Private"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                typeFilter === t
                  ? "bg-slate-300 text-slate-950 border-transparent"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {t === "All" ? "All Types" : t}
            </button>
          ))}

          <div className="w-px h-5 bg-slate-700 hidden sm:block" />

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400 rounded-full px-3 py-1.5 focus:outline-none focus:border-slate-500 hover:border-slate-500 cursor-pointer"
          >
            <option value="All">All States</option>
            {ALL_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <p className="text-sm text-slate-500 mb-4">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {COLLEGES.length} colleges
          {leanFilter !== "All" && <span> · Lean: <span className="text-white font-bold">{leanFilter}</span></span>}
          {stateFilter !== "All" && <span> · State: <span className="text-white font-bold">{stateFilter}</span></span>}
          {typeFilter !== "All" && <span> · Type: <span className="text-white font-bold">{typeFilter}</span></span>}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">🎓</p>
            <p className="font-bold text-white">No colleges match your filters</p>
            <p className="text-sm mt-1">Try adjusting or clearing your filters</p>
            <button
              onClick={() => { setSearch(""); setLeanFilter("All"); setTypeFilter("All"); setStateFilter("All"); }}
              className="mt-4 text-sm text-purple-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((college, i) => {
              const s = LEAN_STYLES[college.lean];
              const slug = college.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              return (
                <Link
                  key={`${college.name}-${i}`}
                  href={`/college/${slug}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-purple-500 transition-all block"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-white text-sm leading-snug group-hover:text-purple-300">{college.name}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${s.badge} ${s.text}`}>
                      {s.icon} {college.lean}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mb-2">
                    <span className="text-[11px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{college.state}</span>
                    <span className="text-[11px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded">{college.type}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{college.notes}</p>
                  <p className="text-[10px] text-purple-500 mt-2 font-semibold">View details →</p>
                </Link>
              );
            })}
          </div>
        )}

        <p className="mt-10 text-[11px] text-slate-600 text-center max-w-3xl mx-auto">
          Political lean estimates based on Princeton Review annual surveys, faculty political donation records (OpenSecrets), campus speech/freedom rankings (FIRE), and known institutional affiliations. These are generalizations — individual experiences vary.
        </p>
      </section>
    </Layout>
  );
}

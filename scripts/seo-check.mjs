#!/usr/bin/env node

/**
 * SEO Validation Script for A Place Called Home
 * Checks current SEO implementation and provides recommendations
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 SEO Validation for A Place Called Home\n');

// Check if running locally
const isLocal = process.argv.includes('--local');
const port = process.argv.includes('--port') ? process.argv[process.argv.indexOf('--port') + 1] : '3000';

const baseUrl = isLocal ? `http://localhost:${port}` : 'https://www.apchllc.com';

async function checkSEO() {
  try {
    console.log('📊 Checking current SEO implementation...\n');

    // Check if we can access the site
    const response = await fetch(baseUrl);
    if (!response.ok) {
      console.log('❌ Cannot access website. Make sure it\'s running.');
      return;
    }

    const html = await response.text();
    
    // Define target keywords
    const targetKeywords = [
      'assisted living facility',
      'senior care facility',
      'elderly facility',
      'care home',
      'Residential Care Facility for the Elderly',
      'DeSoto',
      'DFW',
      'Dallas'
    ];
    
    // Check title tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      const title = titleMatch[1];
      console.log('✅ Title Tag Found:');
      console.log(`   "${title}"`);
      console.log(`   Length: ${title.length} characters (Optimal: 50-60)`);
      
      // Check for target keywords
      const foundKeywords = targetKeywords.filter(keyword => 
        title.toLowerCase().includes(keyword.toLowerCase())
      );
      
      console.log(`   Target Keywords Found: ${foundKeywords.length}/${targetKeywords.length}`);
      foundKeywords.forEach(keyword => console.log(`     ✅ ${keyword}`));
      
      const missingKeywords = targetKeywords.filter(keyword => 
        !title.toLowerCase().includes(keyword.toLowerCase())
      );
      if (missingKeywords.length > 0) {
        console.log('   Missing Keywords:');
        missingKeywords.forEach(keyword => console.log(`     ❌ ${keyword}`));
      }
    } else {
      console.log('❌ Title tag not found');
    }

    // Check meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    if (descMatch) {
      const description = descMatch[1];
      console.log('\n✅ Meta Description Found:');
      console.log(`   "${description}"`);
      console.log(`   Length: ${description.length} characters (Optimal: 150-160)`);
      
      // Check for target keywords in description
      const foundKeywords = targetKeywords.filter(keyword => 
        description.toLowerCase().includes(keyword.toLowerCase())
      );
      console.log(`   Target Keywords Found: ${foundKeywords.length}/${targetKeywords.length}`);
      foundKeywords.forEach(keyword => console.log(`     ✅ ${keyword}`));
      
      const missingKeywords = targetKeywords.filter(keyword => 
        !description.toLowerCase().includes(keyword.toLowerCase())
      );
      if (missingKeywords.length > 0) {
        console.log('   Missing Keywords:');
        missingKeywords.forEach(keyword => console.log(`     ❌ ${keyword}`));
      }
    } else {
      console.log('\n❌ Meta description not found');
    }

    // Check for structured data
    const structuredDataMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (structuredDataMatches) {
      console.log('\n✅ Structured Data Found:');
      console.log(`   ${structuredDataMatches.length} JSON-LD blocks detected`);
      
      // Check for specific schema types
      const schemaTypes = ['LocalBusiness', 'AssistedLiving', 'SeniorLiving', 'FAQPage'];
      schemaTypes.forEach(type => {
        if (html.includes(`"@type": "${type}"`) || html.includes(`"@type":["${type}"`)) {
          console.log(`     ✅ ${type} schema found`);
        } else {
          console.log(`     ❌ ${type} schema missing`);
        }
      });
    } else {
      console.log('\n❌ No structured data found');
    }

    // Check for H1 tags
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    if (h1Matches) {
      console.log('\n✅ H1 Tags Found:');
      console.log(`   ${h1Matches.length} H1 tag(s) detected`);
      h1Matches.forEach((h1, index) => {
        const text = h1.replace(/<[^>]*>/g, '').trim();
        console.log(`     ${index + 1}. "${text}"`);
      });
    } else {
      console.log('\n❌ No H1 tags found');
    }

    // Check for images with alt text
    const imgMatches = html.match(/<img[^>]*>/gi);
    if (imgMatches) {
      const imagesWithAlt = imgMatches.filter(img => img.includes('alt='));
      const imagesWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
      
      console.log('\n📸 Image Alt Text:');
      console.log(`   Total Images: ${imgMatches.length}`);
      console.log(`   With Alt Text: ${imagesWithAlt.length}`);
      console.log(`   Without Alt Text: ${imagesWithoutAlt.length}`);
      
      if (imagesWithoutAlt.length > 0) {
        console.log('   ⚠️  Some images missing alt text');
      }
    }

    // Check for internal links
    const internalLinks = html.match(/href=["']([^"']*#?[^"']*)["']/gi);
    if (internalLinks) {
      const anchorLinks = internalLinks.filter(link => link.includes('#'));
      console.log('\n🔗 Internal Navigation:');
      console.log(`   Total Internal Links: ${internalLinks.length}`);
      console.log(`   Anchor Links: ${anchorLinks.length}`);
    }

    console.log('\n🎯 SEO Recommendations:');
    console.log('   1. Ensure all target keywords are in title and meta description');
    console.log('   2. Add missing schema markup if any');
    console.log('   3. Optimize image alt text for accessibility');
    console.log('   4. Monitor Google Search Console for indexing');
    console.log('   5. Set up Google My Business listing');
    console.log('   6. Build local citations and backlinks');

  } catch (error) {
    console.error('❌ Error checking SEO:', error.message);
  }
}

// Run the check
checkSEO();

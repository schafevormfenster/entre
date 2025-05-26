"use client";

import React, { useState } from 'react';

export default function ShowcasePosterPage() {
  const [communityName, setCommunityName] = useState('Musterort');
  const [slug, setSlug] = useState('demo');
  
  // Generate poster PDF URL
  const posterUrl = `/api/print/showcase/poster?community=${encodeURIComponent(communityName)}&slug=${slug}`;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Showcase Poster Generator</h1>
      
      <div className="mb-6">
        <label className="block mb-2">
          Community Name:
          <input 
            type="text" 
            value={communityName} 
            onChange={(e) => setCommunityName(e.target.value)}
            className="border p-2 ml-2"
          />
        </label>
        
        <label className="block mb-2">
          Slug:
          <input 
            type="text" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)}
            className="border p-2 ml-2"
          />
        </label>
      </div>
      
      <div className="mb-6">
        <a 
          href={posterUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Poster
        </a>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <iframe 
          src={posterUrl} 
          className="border w-full h-[800px]"
          title="Poster Preview"
        />
      </div>
    </div>
  );
}

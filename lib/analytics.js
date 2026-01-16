/**
 * Vercel Web Analytics Integration
 * 
 * This module provides utilities for integrating Vercel Web Analytics
 * with the Express application.
 */

const { inject } = require('@vercel/analytics');

/**
 * Initializes Vercel Web Analytics
 * Should be called once during application startup
 */
function initializeAnalytics() {
  try {
    inject();
    console.log('Vercel Web Analytics initialized');
  } catch (error) {
    console.error('Failed to initialize Vercel Web Analytics:', error.message);
  }
}

module.exports = {
  initializeAnalytics,
};

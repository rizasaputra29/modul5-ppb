// src/hooks/useRecipes.js
import { useState, useEffect, useCallback } from 'react';
import recipeService from '../services/recipeService';

// --- BUAT CACHE DI LEVEL MODUL ---
const simpleCache = new Map();

/**
 * Custom hook for fetching recipes
 * @param {Object} params Query parameters
 * @returns {Object} { recipes, loading, error, pagination, refetch }
 */
export function useRecipes(params = {}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Ubah params jadi string untuk key cache
  const cacheKey = JSON.stringify(params);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // --- LOGIC CACHING DIMULAI ---
      // 1. Cek apakah data ada di cache
      if (simpleCache.has(cacheKey)) {
        const cachedData = simpleCache.get(cacheKey);
        setRecipes(cachedData.data || []);
        setPagination(cachedData.pagination || null);
        setLoading(false);
        return; // Hentikan eksekusi jika data dari cache
      }
      // --- LOGIC CACHING SELESAI ---

      const response = await recipeService.getRecipes(params);
      if (response.success) {
        setRecipes(response.data || []);
        setPagination(response.pagination || null);
        
        // --- LOGIC CACHING DIMULAI ---
        // 2. Simpan data ke cache
        simpleCache.set(cacheKey, { 
          data: response.data || [], 
          pagination: response.pagination || null 
        });
        // --- LOGIC CACHING SELESAI ---

      } else {
        setError(response.message || 'Failed to fetch recipes');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, [cacheKey]); // Gunakan cacheKey sebagai dependency

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Modifikasi refetch agar menghapus cache sebelum fetch ulang
  const refetchWithInvalidation = useCallback(async () => {
    simpleCache.delete(cacheKey); // Hapus cache
    await fetchRecipes(); // Panggil fetch
  }, [cacheKey, fetchRecipes]);

  return { recipes, loading, error, pagination, refetch: refetchWithInvalidation };
}

/**
 * Custom hook for fetching a single recipe
 * @param {string} id Recipe ID
 * @returns {Object} { recipe, loading, error, refetch }
 */
export function useRecipe(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Key cache untuk resep tunggal
  const cacheKey = `recipe_${id}`;

  const fetchRecipe = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // --- LOGIC CACHING ---
      if (simpleCache.has(cacheKey)) {
        setRecipe(simpleCache.get(cacheKey));
        setLoading(false);
        return;
      }
      // --- SELESAI CACHING ---

      const response = await recipeService.getRecipeById(id);
      if (response.success) {
        setRecipe(response.data);
        
        // --- LOGIC CACHING ---
        simpleCache.set(cacheKey, response.data); // Simpan data ke cache
        // --- SELESAI CACHING ---

      } else {
        setError(response.message || 'Failed to fetch recipe');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recipe');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  }, [id, cacheKey]); // tambahkan cacheKey

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  // Modifikasi refetch agar menghapus cache
  const refetchWithInvalidation = useCallback(async () => {
    simpleCache.delete(cacheKey);
    await fetchRecipe();
  }, [cacheKey, fetchRecipe]);


  return { recipe, loading, error, refetch: refetchWithInvalidation };
}
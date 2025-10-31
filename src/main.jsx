// src/main.jsx
import { StrictMode, useState, lazy, Suspense } from 'react' // <-- MODIFIKASI: Tambahkan lazy & Suspense
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
// Impor statis untuk komponen UI utama
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

// --- TAMBAHAN: Komponen fallback untuk lazy loading ---
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>
  );
}

// --- MODIFIKASI: Ubah impor halaman menjadi lazy ---
const HomePage = lazy(() => import('./pages/HomePage'));
const MakananPage = lazy(() => import('./pages/MakananPage'));
const MinumanPage = lazy(() => import('./pages/MinumanPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CreateRecipePage = lazy(() => import('./pages/CreateRecipePage'));
const EditRecipePage = lazy(() => import('./pages/EditRecipePage'));
const RecipeDetail = lazy(() => import('./components/recipe/RecipeDetail'));

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [mode, setMode] = useState('list'); // 'list', 'detail', 'create', 'edit'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('makanan');
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMode('list');
    setSelectedRecipeId(null);
    setEditingRecipeId(null);
  };
  
  const handleCreateRecipe = () => {
    setMode('create');
  };

  const handleRecipeClick = (recipeId, category) => {
    setSelectedRecipeId(recipeId);
    setSelectedCategory(category || currentPage);
    setMode('detail');
  };

  const handleEditRecipe = (recipeId) => {
    console.log('Edit button clicked! Recipe ID:', recipeId);
    setEditingRecipeId(recipeId);
    setMode('edit');
    console.log('Mode changed to: edit');
  };

  const handleBack = () => {
    setMode('list');
    setSelectedRecipeId(null);
    setEditingRecipeId(null);
  };

  const handleCreateSuccess = (newRecipe) => {
    alert('Resep berhasil dibuat!');
    setMode('list');
    // Optionally navigate to the new recipe's category
    if (newRecipe && newRecipe.category) {
      setCurrentPage(newRecipe.category);
    }
  };

  const handleEditSuccess = (updatedRecipe) => {
    alert('Resep berhasil diperbarui!');
    setMode('list');
  };

  const renderCurrentPage = () => {
    // Show Create Recipe Page
    if (mode === 'create') {
      return (
        <CreateRecipePage
          onBack={handleBack}
          onSuccess={handleCreateSuccess}
        />
      );
    }
    
    // Show Edit Recipe Page
    if (mode === 'edit') {
      return (
        <EditRecipePage
          recipeId={editingRecipeId}
          onBack={handleBack}
          onSuccess={handleEditSuccess}
        />
      );
    }

    // Show Recipe Detail
    if (mode === 'detail') {
      return (
        <RecipeDetail
          recipeId={selectedRecipeId}
          category={selectedCategory}
          onBack={handleBack}
          onEdit={handleEditRecipe}
        />
      );
    }

    // Show List Pages
    switch (currentPage) {
      case 'home':
        return <HomePage 
          onRecipeClick={handleRecipeClick} 
          onNavigate={handleNavigation} />;
      case 'makanan':
        return <MakananPage 
          onRecipeClick={handleRecipeClick} />;
      case 'minuman':
        return <MinumanPage 
          onRecipeClick={handleRecipeClick} />;
      case 'profile':
        // --- MODIFIKASI: Teruskan onRecipeClick ---
        return <ProfilePage 
          onRecipeClick={handleRecipeClick} />;
      default:
        return <HomePage 
          onRecipeClick={handleRecipeClick} 
          onNavigate={handleNavigation} />;
    }
  };
  
  if (showSplash) {
    return <SplashScreen 
      onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show navbar in list mode */}
      {mode === 'list' && (
        <>
          <DesktopNavbar 
            currentPage={currentPage} 
            onNavigate={handleNavigation}
            onCreateRecipe={handleCreateRecipe}
          />
          <MobileNavbar 
            currentPage={currentPage} 
            onNavigate={handleNavigation}
            onCreateRecipe={handleCreateRecipe}
          />
        </>
      )}
      
      {/* --- MODIFIKASI: Bungkus <main> dengan <Suspense> --- */}
      <Suspense fallback={<LoadingFallback />}>
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>
      </Suspense>
      
      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
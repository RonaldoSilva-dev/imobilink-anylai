import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '3rem',
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div>
            <h1 style={{ 
              color: '#1f2937', 
              margin: '0 0 0.5rem 0',
              fontSize: '1.875rem'
            }}>
              🏠 Dlogg Platform
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: 0,
              fontSize: '1.125rem'
            }}>
              Bem-vindo, {user?.name}!
            </p>
          </div>
          <Button onClick={handleLogout} variant='danger'>
            Sair
          </Button>
        </div>

        {/* Cards de Navegação */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* Dashboard do Corretor */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onClick={() => navigate('/corretor/dashboard')}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              📊
            </div>
            <h3 style={{ 
              color: '#374151', 
              margin: '0 0 1rem 0',
              fontSize: '1.25rem'
            }}>
              Dashboard do Corretor
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              Acesse sua área profissional completa com métricas, matches e gestão de imóveis.
            </p>
            <Button variant='primary'>
              Acessar Dashboard
            </Button>
          </div>

          {/* Perfil do Corretor */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }} onClick={() => navigate('/corretor/profile')}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              👤
            </div>
            <h3 style={{ 
              color: '#374151', 
              margin: '0 0 1rem 0',
              fontSize: '1.25rem'
            }}>
              Meu Perfil
            </h3>
            <p style={{ 
              color: '#6b7280', 
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5'
            }}>
              Gerencie suas informações profissionais, especializações e certificados.
            </p>
            <Button variant='secondary'>
              Editar Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
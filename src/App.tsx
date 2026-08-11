import { useEffect, useState } from 'react'
import * as authApi from '@/api/auth'
import { getToken, setToken } from '@/api/client'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { SignupScreen } from '@/components/auth/SignupScreen'
import { ForgotScreen } from '@/components/auth/ForgotScreen'
import { BoardScreen } from '@/components/board/BoardScreen'
import { ApplicationsScreen } from '@/components/dashboard/ApplicationsScreen'
import { DashboardScreen } from '@/components/dashboard/DashboardScreen'
import { AppShell } from '@/components/layout/AppShell'
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen'
import { ProfileScreen } from '@/components/profile/ProfileScreen'
import { Toasts } from '@/components/ui/Toasts'
import { useApps } from '@/hooks/useApps'
import { useToasts } from '@/hooks/useToasts'
import type { Application, BoardView, Screen, User } from '@/types'

const APP_SCREENS: Screen[] = ['dashboard', 'board', 'applications', 'profile']

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [view, setView] = useState<BoardView>('loaded')
  const [authError, setAuthError] = useState<string | null>(null)
  const [dashEdit, setDashEdit] = useState<Application | null>(null)
  const { apps, refresh, saveApp, removeApp, moveApp } = useApps()
  const { toasts, addToast, dismiss } = useToasts()

  useEffect(() => {
    const token = getToken()
    if (!token) return
    authApi
      .getMe()
      .then(async (me) => {
        setUser(me)
        setView('loading')
        try {
          await refresh()
          setView('loaded')
          setScreen('dashboard')
        } catch {
          setView('error')
          setScreen('dashboard')
        }
      })
      .catch(() => setToken(null))
  }, [refresh])

  async function loadBoardData() {
    setView('loading')
    try {
      await refresh()
      setView('loaded')
    } catch {
      setView('error')
    }
  }

  async function afterAuth(me: User, onboard: boolean) {
    setUser(me)
    setAuthError(null)
    if (onboard) {
      setScreen('onboarding')
      return
    }
    setScreen('dashboard')
    await loadBoardData()
  }

  async function handleLogin(email: string, password: string) {
    setAuthError(null)
    try {
      const me = await authApi.login(email, password)
      await afterAuth(me, false)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Login failed')
    }
  }

  async function handleSignup(name: string, email: string, password: string) {
    setAuthError(null)
    try {
      const me = await authApi.signup(name, email, password)
      await afterAuth(me, true)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Signup failed')
    }
  }

  async function handleLogout() {
    await authApi.logout()
    setUser(null)
    setScreen('login')
  }

  async function handleSave(data: Omit<Application, 'id'> & { id?: string }) {
    await saveApp(data)
  }

  async function handleRetry() {
    await loadBoardData()
  }

  function handleAppNav(s: Screen) {
    if (s === 'board' || s === 'dashboard' || s === 'applications') {
      if (view !== 'loaded') void handleRetry()
    }
    setScreen(s)
  }

  const inApp = user && APP_SCREENS.includes(screen)

  return (
    <div style={{ minHeight: '100vh' }}>
      {screen === 'login' && (
        <LoginScreen nav={setScreen} dark={dark} onLogin={handleLogin} error={authError} />
      )}
      {screen === 'signup' && (
        <SignupScreen nav={setScreen} dark={dark} onSignup={handleSignup} error={authError} />
      )}
      {screen === 'forgot' && <ForgotScreen nav={setScreen} dark={dark} />}
      {screen === 'onboarding' && user && (
        <OnboardingScreen
          user={user}
          dark={dark}
          nav={(s) => {
            if (s === 'board' || s === 'dashboard') void handleRetry()
            setScreen(s === 'board' ? 'dashboard' : s)
          }}
          onAdd={() => {
            setScreen('board')
            void handleRetry()
          }}
        />
      )}

      {inApp && user && (
        <AppShell
          user={user}
          active={screen}
          nav={handleAppNav}
          dark={dark}
          setDark={setDark}
          onLogout={handleLogout}
        >
          {screen === 'dashboard' && (
            <DashboardScreen
              user={user}
              apps={apps}
              dark={dark}
              nav={handleAppNav}
              onOpenApp={(a) => {
                setDashEdit(a)
                setScreen('applications')
              }}
            />
          )}
          {screen === 'board' && (
            <BoardScreen
              apps={apps}
              dark={dark}
              addToast={addToast}
              view={view}
              setView={setView}
              onSave={handleSave}
              onDelete={removeApp}
              onMove={moveApp}
              onRetry={handleRetry}
            />
          )}
          {screen === 'applications' && (
            <ApplicationsScreen
              apps={apps}
              dark={dark}
              onSave={handleSave}
              onDelete={removeApp}
              addToast={addToast}
              initialEdit={dashEdit}
              onClearInitialEdit={() => setDashEdit(null)}
            />
          )}
          {screen === 'profile' && (
            <ProfileScreen
              user={user}
              setUser={setUser}
              nav={setScreen}
              dark={dark}
              onLogout={handleLogout}
            />
          )}
        </AppShell>
      )}

      <Toasts items={toasts} dismiss={dismiss} />
    </div>
  )
}

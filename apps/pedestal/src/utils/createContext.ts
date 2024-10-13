function useContext(user: any) {
  return () => {
    const prefix = '/api'
    return { ...user, prefix }
  }
}

export { useContext }

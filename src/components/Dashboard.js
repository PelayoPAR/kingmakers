import React, { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { Card, Button, Alert, Pagination} from "react-bootstrap"
import wretch from "wretch"
const limit = 10

export default function Dashboard() {

  const [error, setError] = useState('')
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [pokeList, setPokeList] = useState([])
  const [pokeCount, setPokeCount] = useState(0)

  async function handleLogout() {
    setError('')
    
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
    async function getPokemons() {
      wretch(`https://pokeapi.co/api/v2/pokemon/?offset=${page*limit}&limit=${limit}`)
      .get()
      .json(json => {
        setPokeList(json.results)
        setPokeCount(json.count)
  });
}
getPokemons()
  }, [page])

  const lastPage = Math.floor(pokeCount/limit)

  return (
    <>
    <h2 className="text-center mb-4">PokeList</h2>
    <Card>
      <Card.Body className='text-center'>
        {pokeList.map((pokemon, id) => {
          return <p key={id}>{pokemon.name}</p>
        })}
      </Card.Body>
    </Card>
    <Pagination className='justify-content-center mt-1' >
      <Pagination.First onClick={() => {setPage(0)}}/>
      {page > 0 && <Pagination.Prev onClick={() => {setPage(page-1)}} />}
      <Pagination.Item active>{page}</Pagination.Item>
      {page < lastPage && <Pagination.Next onClick={() => {setPage(page+1)}}/>}
      <Pagination.Last onClick={() => {setPage(lastPage)}} />
    </Pagination>
    <Card className='mt-3'>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Your Email:</strong> {currentUser.email}
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant="link" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
    </>
  )
}

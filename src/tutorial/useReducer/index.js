import React, { useState, useReducer } from 'react'
import Modal from './Modal'
import { data } from '../../data'
// reducer function
const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload]
    return {
      ...state,
      people: newPeople,
      isModalOpen: true,
      modalContent: 'item added',
    }
  }
  if (action.type === 'NO_VALUE') {
    return { ...state, isModalOpen: true, modalContent: 'please enter value' }
  }
  if (action.type === 'CLOSE_MODAL') {
    return { ...state, isModalOpen: false }
  }
  if (action.type === 'REMOVE_ITEM') {
    const newPeople = state.people.filter((item) => item.id !== action.payload)
    return { ...state, people: newPeople }
  }
  return state
}
const initialState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
}
const Index = () => {
  // const [people, setPeople] = useState(data)
  // const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      let newItem = { id: new Date().getTime().toString(), name }
      dispatch({ type: 'ADD_ITEM', payload: newItem })
      setName('')
      // setShowModal(true)
      // setPeople([...people, { id: new Date().getDay().toString(), name }])
      // setName('')
    } else {
      // setShowModal(true)
      dispatch({ type: 'NO_VALUE' })
    }
  }
  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }
  return (
    <>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type='submit' className='btn'>
          add
        </button>
      </form>
      {state.people.map((person) => {
        return (
          <div key={person.id} className='item'>
            <h4>{person.name}</h4>
            <button
              className='btn'
              onClick={() =>
                dispatch({ type: 'REMOVE_ITEM', payload: person.id })
              }
            >
              remove
            </button>
          </div>
        )
      })}
    </>
  )
}

export default Index

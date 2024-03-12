package com.example.todo.todo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Todo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	public String todo;
	public Boolean editing;
	public Boolean isdone;
	
	public Boolean getEditing() {
		return editing;
	}
	public void setEditing(Boolean editing) {
		this.editing = editing;
	}
	public Boolean getIsdone() {
		return isdone;
	}
	public void setIsdone(Boolean isdone) {
		this.isdone = isdone;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	
	}
	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Todo(int id, String todo, Boolean editing, Boolean isdone) {
		super();
		this.id = id;
		this.todo = todo;
		this.editing = editing;
		this.isdone = isdone;
	}
	}
	
	


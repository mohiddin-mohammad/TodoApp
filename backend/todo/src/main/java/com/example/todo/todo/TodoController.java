package com.example.todo.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://orange-potato-x5wv75qgwvwxfvx9w-5173.app.github.dev/")
@RequestMapping("/todo")
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;
	
	//create
	@PostMapping(value = "/create",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
	public String createTodo(@RequestBody Todo todo){
		todoRepository.save(todo);
		return "added succesfully";
	}
	
	//read
	@GetMapping("/read")
	public List<Todo> getTodos()
	{
		List<Todo> list = todoRepository.findAll();
		return list;
	}
	
	//read by id
	@GetMapping("/read/{id}")
	public Optional<Todo> getTodos(@PathVariable int id)
	{
		return todoRepository.findById(id);
	}
	
	//update
	@PutMapping("/update/{id}")
	public String updateTodo(@RequestBody Todo todo,@PathVariable int id)
	{
		Todo todobj= todoRepository.findById(id).get();
		todobj.setTodo(todo.getTodo());
		todobj.setEditing(todo.getEditing());
		todobj.setIsdone(todo.getIsdone());
		todoRepository.save(todobj);
		return "updated sucessfully..!!!";
	}
	
	//delete
	@DeleteMapping("/delete/{id}")
	public void deleteTodo(@PathVariable int id)
	{
		todoRepository.deleteById(id);
	}
}

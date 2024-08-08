package com.nbti.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.services.VacationCategoryService;

@RestController
@RequestMapping("/vacationCategroy")
public class VacationCategoryController {
	
	@Autowired
	private VacationCategoryService vcServ;
	
	@GetMapping("/{category}")
	public String getCategoryName(@PathVariable int category) {
		System.out.println(category);
		return vcServ.getCategoryName(category);
	}

}

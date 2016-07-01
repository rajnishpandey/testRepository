package com.staterkit.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.staterkit.domain.Album;
import com.staterkit.service.AlbumService;



/**
 * @author narendra.gurram@cognizant.com This AlbumController class for
 *         providing service to incoming client requests
 */

@RestController
public class AlbumController {

	@Autowired
	private AlbumService albumService;

	/**
	 * Default Welcome page
	 * 
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView welcome(Model model) {
		ModelAndView view = new ModelAndView();
		view.setViewName("welcome");
		return view;
	}

	/**
	 * @description This method maps to GET type of HTTP request with /albums URL. Get the
	 * list of tasks from DB by calling the getAlbumList service. Send the album
	 * list as a response
	 * 
	 * @param model
	 * @return albums
	 */
	@RequestMapping(value = "/albums", method = RequestMethod.GET)
	public List<Album> listAlbums(Model model) {
		if(albumService != null){
			List<Album> albums = (List<Album>) albumService.getAlbumList();
			return albums;
		}else{
			return new ArrayList<Album>();
		}

	}

	
}

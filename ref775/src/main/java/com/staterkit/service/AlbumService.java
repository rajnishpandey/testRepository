/**
 * 
 */
package com.staterkit.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staterkit.domain.Album;
import com.staterkit.repositories.JpaAlbumRepository;

/**
 * This class handle all service calls
 * @author Anand.Kittappa@cognizant.com
 *
 */
@Service
public class AlbumService {

	@Autowired
	private JpaAlbumRepository jpaAlbumRepository;

	
	/**
	 * Get all the task from 'Album' Table by calling the findAll method
	 * 
	 * @return List of Albums
	 */
	public List<Album> getAlbumList() {
		return (List<Album>) jpaAlbumRepository.findAll();
	}

	
}

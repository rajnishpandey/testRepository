package com.staterkit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Album
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Album() {
    }

 
    /**
     * @return id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

   
}

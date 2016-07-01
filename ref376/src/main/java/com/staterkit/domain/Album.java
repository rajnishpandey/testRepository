package com.staterkit.domain;

import org.springframework.data.annotation.Id;

public class Album
{
    @Id
    private String id;
   

    public Album() {
    }

  

    /**
     * @return
     */
    public String getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

  

    
}

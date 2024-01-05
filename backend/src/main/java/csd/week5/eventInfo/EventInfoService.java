package csd.week5.eventInfo;

import java.util.List;

public interface EventInfoService {
    List<EventInfo> listEventInfo();

    EventInfo getEventInfo(Long id);

    EventInfo addEventInfo(EventInfo eventInfo);

    EventInfo updateEventInfo(Long id, EventInfo eventInfo);


    /**
     * Change method's signature: do not return a value for delete operation
     * 
     * @param id
     */
    void deleteEventInfo(Long id);

    // EventInfo getEventInfo(String title);

}
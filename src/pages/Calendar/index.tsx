import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { CalendarOptions } from "@fullcalendar/common";
import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "../../base-components/PreviewComponent";
import { useState, useRef } from "react";
import { FormLabel, FormSwitch } from "../../base-components/Form";
import { Menu, Dialog } from "../../base-components/Headless";
import Litepicker from "../../base-components/Litepicker";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

function Main() {
  const [date, setDate] = useState("");
  const calendarRef = useRef<FullCalendar | null>(null);
  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, resourceTimeGridPlugin],
    droppable: true,
    headerToolbar: false,
    initialView: 'resourceTimeGridDay',
    views: {
        resourceTimeGridTwoDay: {
            type: 'resourceTimeGrid',
            duration: { days: 1 },
        }
    },
    eventResourceEditable: true,
    refetchResourcesOnNavigate: true,
    allDaySlot: false,
    navLinks: true,
    editable: true,
    dayMaxEvents: true,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',
    contentHeight: 'auto',
    selectable: true,
    resources: [
      { id: 'a', title: 'Staff 1' },
      { id: 'b', title: 'Staff 2'},
      { id: 'c', title: 'Staff 3' },
      { id: 'd', title: 'Staff 4' }
    ],
    drop: function (info) {
      if (
        document.querySelectorAll("#checkbox-events").length &&
        (document.querySelectorAll("#checkbox-events")[0] as HTMLInputElement)
          ?.checked
      ) {
        (info.draggedEl.parentNode as HTMLElement).remove();
        if (
          document.querySelectorAll("#calendar-events")[0].children.length == 1
        ) {
          document
            .querySelectorAll("#calendar-no-events")[0]
            .classList.remove("hidden");
        }
      }
    },
  };

  const nextDay = () => {

  }
  return (
    <div className="full-calendar">
      {/* BEGIN: Input Group */}
      <PreviewComponent className="mt-5 intro-y bg-transparent">
            {({ toggle }) => (
              <>
                <div className="p-5 bg-transparent">
                  <Preview>
                    <div className="relative w-56 mx-auto">
                      <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <Lucide icon="Calendar" className="w-4 h-4" />
                      </div>
                      <Litepicker
                        value={date}
                        onChange={setDate}
                        options={{
                          autoApply: false,
                          showWeekNumbers: true,
                          dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                          },
                        }}
                        className="pl-12"
                      />
                    </div>
                  </Preview>
                  <Source>
                    <Highlight>
                      {`
              <div className="relative w-56 mx-auto">
                <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                  <Lucide icon="Calendar" className="w-4 h-4" />
                </div>
                <Litepicker
                  value={date}
                  onChange={setDate}
                  options={{
                    autoApply: false,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="pl-12"
                />
              </div>
              `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
      <FullCalendar {...options} />
    </div>
  );
}

export default Main;

import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import clsx from 'clsx';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

type Props = {
  link: string;
  icon: ReactNode,
  title: string,
  isExpand: boolean,
  childrens?: {
    link: string;
    icon?: ReactNode,
    title: string,
  }[]
};

function ContextAwareToggle({ children, eventKey, isExpand, callback }: {
  children: ReactNode;
  eventKey: string;
  isExpand: boolean;
  callback?: (eventKey: string) => void;
}) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className={clsx('bg-transparent no-spacing border-0 hstack gap-2', isCurrentEventKey ? 'text-primary fw-semibold' : 'text-muted')}
      onClick={decoratedOnClick}
    >
      {children}
      {isExpand && (
        <span>
          {isCurrentEventKey ? <ArrowUp2 size="24" variant="Bulk" /> : <ArrowDown2 size="24" variant="Bulk" />}
        </span>
      )}
    </button>
  );
}

const SideBarLink = ({
  link,
  icon,
  title,
  isExpand,
  childrens
}: Props) => {

  return (
    <>
      {childrens ? (
        <>
          <Accordion>
            <ContextAwareToggle eventKey="0" callback={() => { }} isExpand={isExpand}>
              {icon}
              {isExpand && title}
            </ContextAwareToggle>
            <Accordion.Collapse eventKey='0'>
              <div className='py-2 ms-3 vstack gap-2'>
                {childrens.map((child, index) => (
                  <NavLink
                    key={index}
                    className={
                      ({ isActive }) =>
                        `sidenav-link ${isActive ? "text-primary fw-semibold" : "text-muted"}`
                    }
                    to={child.link}
                  >
                    {child.icon}
                    {isExpand && child.title}
                  </NavLink >
                ))}
              </div>
            </Accordion.Collapse>
          </Accordion>
        </>

      ) : (
        <NavLink
          className={
            ({ isActive }) =>
              `sidenav-link ${isActive ? "text-primary fw-semibold" : "text-muted"}`
          }
          to={link}
        >
          {icon}
          {isExpand && title}
        </NavLink >
      )}
    </>
  );
};

export default SideBarLink;

'use client';

import React from 'react';
import { handleSetScrollDirection } from '../../../context/action';

import {
  useGetValueFromContext,
  useIsomorphicLayoutEffect,
} from '../../../hooks';
import { ScrollTrigger } from '../../../lib/gsap';
import Header from '../Header';

const Index = ({
  includeMarquee = true,
  includeSearchbar = true,
  children,
}: {
  includeMarquee?: boolean;
  includeSearchbar?: boolean;
  children: React.ReactNode;
}) => {
  const { dispatch } = useGetValueFromContext();

  useIsomorphicLayoutEffect(() => {
    function initScrollDirectionIndicator() {
      const body = document.querySelector('.body');

      ScrollTrigger.create({
        markers: false,
        trigger: body,
        start: 'top -20%',
        onUpdate: (self) => {
          if (self.direction === 1) {
            handleSetScrollDirection('down', dispatch);
          } else {
            handleSetScrollDirection('up', dispatch);
          }
        },
      });
    }
  }, []);

  return (
    <main>
      <Header
        includeMarquee={includeMarquee}
        includeSearchbar={includeSearchbar}
      />
      {children}
    </main>
  );
};

export default Index;

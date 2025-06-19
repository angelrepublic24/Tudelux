'use client';

import { State } from 'country-state-city';
import { useEffect, useState } from 'react';
import { Controller, Control } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type Props = {
  control: Control<any>;
};

const validUSStateCodes = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
  'DC'
];

export const StateSelector = ({ control }: Props) => {
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);

  useEffect(() => {
    const usStates = State.getStatesOfCountry('US');
    const filteredStates = usStates.filter((state) =>
      validUSStateCodes.includes(state.isoCode)
    );
    setStates(filteredStates);
  }, []);

  return (
    <Controller
      name="address_state"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select State (e.g. NJ)" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.isoCode} value={state.isoCode}>
                {state.isoCode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

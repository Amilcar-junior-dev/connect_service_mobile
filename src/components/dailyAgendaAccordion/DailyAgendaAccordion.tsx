import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useActiveTheme } from '~/hooks/colorScheme';

import { DailyAgenda } from '~/models/appointment.model';
import { useDailyAgendaViewModel } from './dailyAgenda.viewModel';

import Arrow from '~/assets/svg/ArrowLeft.svg';
import Plus from '~/assets/svg/Plus.svg';
import Event from '~/assets/svg/Event.svg';
import { AppointmentCard } from '../appointmentCard/Appointment.view';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface DailyAgendaAccordionProps {
  agenda: DailyAgenda;
}

export function DailyAgendaAccordion({ agenda }: DailyAgendaAccordionProps) {
  const { colors } = useActiveTheme();
  const vm = useDailyAgendaViewModel(agenda);

  const AnimatedArrowStyle = useAnimatedStyle(()=>{
    return {
      transform: [
        {rotate: withTiming(vm.isExpanded ? '90deg' : '-90deg' , {duration:300})}
      ]
    }
  },[vm.isExpanded])


  return (
    <View className={`w-full flex-col mt-3`}>
      <View className="w-full flex-row h-10 rounded-md bg-tabBar/5" >
        <View className="w-1 h-full rounded-tl-md rounded-bl-md bg-tabBar" />
        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={vm.toggleAccordion}
          className="w-11/12 h-full flex-row"
        >
          <View className="w-7/12 px-2 h-full items-center flex-row justify-between">
            <Text className="font-robotoBold text-sm text-ink" numberOfLines={1}> 
              {agenda.formattedDate}
            </Text>
            <Animated.View style={[{ marginLeft: 5,},AnimatedArrowStyle]}>
              
              <Arrow  height={15} width={15} color={colors.ink}  />
            </Animated.View>
          </View>

          <View className="w-2/12 flex-row items-center justify-center">
              <Text className="font-robotoBold text-sm text-ink"> 
                {agenda.totalEvents} 
              </Text>
              <Event height={15} width={15} color={colors.ink} style={{ marginLeft: 2 }}/>
          </View>

          <View className="w-3/12 flex-row items-center justify-center">
            <Text className="font-robotoBold text-sm text-ink"> 
              {vm.formattedValue} 
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={vm.handleAddPress}
          className="w-1/12 h-full items-center justify-center"
        >
            <Plus height={12} width={12} color={colors.ink}/>
        </TouchableOpacity>
      </View>

      {vm.isExpanded && (
        <View className={`w-full px-2 pb-2`}>
          {agenda.appointments.map((appointment) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
            />
          ))}
        </View>
      )}

    </View>
  );
}
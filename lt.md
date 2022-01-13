## design


from random import randrange


class Solution(object):

    def __init__(self, nums):
        """
        :type nums: List[int]
        """
        self.orig = nums

    def reset(self):
        """
        Resets the array to its original configuration and return it.
        :rtype: List[int]
        """
        return self.orig

    def shuffle(self):
        """
        Returns a random shuffling of the array.
        :rtype: List[int]
        """
        lis = []
        local_nums = len(self.orig)
        random_shuffle = randrange(1, local_nums)
        lis.extend(self.orig[random_shuffle:])
        lis.extend(self.orig[:random_shuffle])
        return lis

    # Your Solution object will be instantiated and called as such:


input_arr = [10,184,-6]
obj = Solution(input_arr)
for i in range(10000):
    param_1 = obj.reset()
    param_2 = obj.shuffle()

    print(param_1)
    print(param_2)


## dynamic

def climbStairs(n):
    if n <= 3:
        return n

    output = 0
    current = 3
    previous = 2
    for i in range(4, n + 1):
        output = current + previous
        previous = current
        current = output
    return output


print(climbStairs(6))




def maxProfit(prices):
    profit = 0
    current = 0
    i = 0
    started = False
    while i < len(prices) - 1:
        if not started:
            if prices[current] < prices[i + 1]:
                started = True
                for j in range(i + 1, len(prices)):
                    if prices[j] - prices[current] > 0 and prices[j] - prices[current] > profit:
                        profit = prices[j] - prices[current]
                i += 1
            else:
                current = i + 1
                i += 1

        else:
            if prices[i + 1] < prices[current]:
                current = i + 1
                i += 1
                for j in range(i + 1, len(prices)):
                    if prices[j] - prices[current] > 0 and prices[j] - prices[current] > profit:
                        profit = prices[j] - prices[current]
            else:
                i += 1

    return profit


# input_arr = [3, 2, 6, 5, 0, 3]
# input_arr = [7, 6, 4, 3, 1]
# input_arr = [7, 1, 5, 3, 6, 4]
# input_arr = [2, 1, 4]
# input_arr = [3, 3, 5, 0, 0, 3, 1, 4]
# input_arr = [1, 2]
# input_arr = [1, 2, 4]
input_arr = [4, 7, 2, 1, 11]

print(maxProfit(input_arr))

# METHOD: two sections. the first finds the first position with the lowest value, and loops to calculate the max profit.
# then we move to the second section which loops to find a position that may have a value even lower than current lowest, and proceeds to find the max profit.



def maxSubArray(nums):

    if len(nums) == 2:
        return max(nums[0], nums[1], nums[0] + nums[1])

    if len(nums) == 1:
        return nums[0]

    dic = {}
    i = len(nums) - 1
    dic[i] = nums[i]
    high = nums[i]
    i -= 1
    dic[i] = max(nums[i], nums[i] + nums[i+1])
    high = max(high, nums[i], nums[i] + nums[i+1])
    i -= 1

    while i >= 0:
        next_pos = i + 1
        current = nums[i]
        nn = current + nums[next_pos]
        with_dict = current + dic[next_pos]
        local_max = max(current, nn, with_dict)
        dic[i] = local_max
        high = max(high, local_max)
        i -= 1

    return high

# METHOD
# create a dictionary by summing current with the last sum from dictionary.
# calculate local max which is max of current, current + next, or current + dictionary.
# add local max to dictionary at current position.
# take max of global max vs local max

# input_arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
# input_arr = [5,4,-1,7,8]
# input_arr = [-1,0,-2]
# input_arr = [-2,-3,-1]

print(maxSubArray(input_arr))





def rob(nums):
    dp = {}
    if len(nums) == 0:
        return 0

    if len(nums) == 1:
        return nums[0]

    if len(nums) == 2:
        return max(nums[0], nums[1])

    if len(nums) == 3:
        return max(nums[0] + nums[2], nums[1])

    dp[0] = nums[0]
    dp[1] = nums[1]
    dp[2] = nums[0] + nums[2]

    total = max(dp[0], dp[1], dp[2])
    i = 3
    while i < len(nums):
        local_max = max(dp[i - 2] + nums[i], dp[i - 3] + nums[i])
        dp[i] = local_max
        total = max(total, local_max)
        i += 1
    return total


# input_arr = [2, 1, 1, 2, 5]
# input_arr = [1, 2, 3, 1]
input_arr = [2, 7, 9, 3, 1]

print(rob(input_arr))



## math 

def countPrimes(n):
    if n == 1:
        return 1
    total = 0
    factors = [2, 3, 5, 7]
    if n in factors:
        return factors.index(n)

    good = True
    for f in factors:
        if n % f > 0:
            continue
        else:
            good = False
            break

    if good:
        total += 1
    return total

print(countPrimes(10))


import math
from decimal import Decimal, getcontext


def isPowerOfThree(n):
    number = Decimal(n)
    print(number)
    getcontext().prec = 2
    if n == 0:
        return False
    if n == 1:
        return True

    y = Decimal(math.log(number, 3))
    f = math.floor(Decimal(math.log(number, 3)))

    print("y", y, "f", f)

    divide = Decimal(math.log(n, 3)) / math.floor(Decimal(math.log(n, 3)))
    print(divide)
    return divide == 1


print(isPowerOfThree(243))


def romanToInt(s):
    dd = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    opt = {'IV': 4, 'IX': 9, 'XL': 40, 'XC': 90, 'CD': 400, 'CM': 900}

    if len(s) == 0:
        return 0

    total = 0
    i = len(s) - 2
    while i > -1:
        cur = s[i:i + 2]
        if cur in opt:
            total += opt[cur]
            i -= 2
        else:
            total += dd[s[i + 1]]
            i -= 1

    if i == -1:
        total += dd[s[0]]
    return total

value = 'LVIII'
value = 'XLIV'
print(romanToInt(value))

# METHOD:
# start from back, look at two characters at a time, if they match the special cases, then add to total and skip 2.
# else add the latter character to total and move back one position.
# lookups with 2 dicts.


## sorting and searching


def merge(nums1, m, nums2, n):
    if n == 0:
        return
    i = 0
    j = 0
    while i < m:
        if nums2[j] < nums1[i]:
            temp = nums1[i]
            nums1[i] = nums2[j]
            nums2[j] = temp
            # fix nums2
            if n > 1:
                while True:
                    if j < n - 1 and nums2[j] > nums2[j + 1]:
                        jj = nums2[j]
                        nums2[j] = nums2[j + 1]
                        nums2[j + 1] = jj
                        j += 1
                    else:
                        j = 0
                        break

        i += 1

    while j < n:
        nums1[i] = nums2[j]
        i += 1
        j += 1


in1 = [4,5,6,0,0,0]
in2 = [1,2,3]
merge(in1, 3, in2, len(in2))
print(in1)


# METHOD. find num1 elements that are larger than the first num2 element and swap.
# when that happens, fix nums2 by moving the new swapped number in its right place.
# reset nums2 pointer to beginning for the next swap in case.
# once done with nums1, nums1 pointer is now at the 0s, just copy in all nums2 elements into remaining nums1


# METHOD2. add num2 elements to num1. use array sort on nums1
# def merge(nums1, m, nums2, n):
#     i = m
#     j = 0
#
#     while j < n:
#         nums1[i] = nums2[j]
#         i += 1
#         j += 1
#
#     nums1.sort()
#



from math import floor


def isBadVersion(val):
    # array = [False, False, False, False, False, False, False, False, False, False, False, False, False, True, True]
    array = [False, True]
    return array[val]


def firstBadVersion(n):
    if n == 1:
        return n
    val = binarySearch(0, n - 1)
    return val - 1 if isBadVersion(val - 1) else val


def binarySearch(low, high):
    if low == high:
        return high

    if high - low == 1:
        return high

    mid = (low + high) // 2
    if not isBadVersion(mid):
        low = (low + high) // 2
        return binarySearch(low, high)
    else:
        return binarySearch(low, mid)

print(firstBadVersion(2))

# METHOD. do a binary search with low bound and high bound. go higher if still not a bad version yet, else go lower recursively
# once high == low or high - low == 1, possible element is found. check the one before because even/odd, if not bad then return.

# SUBMITTED SOLUTION
#     def firstBadVersion(n):
#         if n == 1:
#             return n
#         val = binarySearch(1, n)
#         return val - 1 if isBadVersion(val - 1) else val
#
#
# def binarySearch(low, high):
#     if low == high:
#         return high
#
#     if high - low == 1:
#         return high
#
#     mid = (low + high) // 2
#     if not isBadVersion(mid):
#         low = (low + high) // 2
#         return binarySearch(low, high)
#     else:
#         return binarySearch(low, mid)



## Strings 


def reverse_string(s):
    i = 0
    last = len(s) - 1
    while i < last:
        temp = s[last]
        s[last] = s[i]
        s[i] = temp
        i += 1
        last -= 1


input_arr = ['h', 'e', 'l', 'l', 'o']
print(reverse_string(input_arr), input_arr)



def reverse_integer(x):
    s = str(x)

    out = []
    for c in s:
        if c == '-':
            continue
        out.insert(0, c)
    return 0 if int(''.join(out)) > pow(2, 31) else -1 * int(''.join(out)) if s[0] == '-' else int(''.join(out))


input_arr = 123
print(reverse_integer(input_arr))

# turn it into an array then use int. find - sign if any.


def first_unique(s):
    dic = dict()
    i = 0
    while i < len(s):
        if s[i] in dic:
            dic[s[i]] += 1
        else:
            dic[s[i]] = 1
        i += 1

    first = len(s)
    print(dic)
    for k, v in dic.items():
        if v == 1:
            first = min(first, s.index(k))

    return -1 if first == len(s) else first


input_arr = "loveleetcode"
print(first_unique(input_arr))

# METHOD1: use ordered dict to store each element count.
# Then, find first entry with count 1.
#
# METHOD2: improvement: use dictionary to store each element count.
# Then, go through and find minimum index of elements with count 1




def valid_anagram(s, t):
    dic = dict()

    if len(s) != len(t):
        return False

    i = 0
    length = len(s) - 1
    while i <= length:
        if s[i] in dic:
            dic[s[i]] += 1
        else:
            dic[s[i]] = 1

        if s[length] in dic:
            dic[s[length]] += 1
        else:
            dic[s[length]] = 1

        i += 1
        length -= 1

    for j in range(len(t)):
        if t[j] in dic:
            if dic[t[j]] > 0:
                dic[t[j]] -= 1
            else:
                return False
        else:
            return False

    return True


in1 = "anagram"
in2 = "nagaram"
print(valid_anagram(in1, in2))

# METHOD1
# create dictionary from 1st string. short loop with 2 pointers.
# loop through 2nd string, if you find in dic and value > 0, decrement.
# continue until you finish 2nd string and return true, or fail with false.

# METHOD2
# sort strings. loop through them and match. slower.

def valid2(s, t):
    if len(s) != len(t):
        return False

    s, t = sorted(s), sorted(t)
    for i in range(len(s)):
        if s[i] != t[i]:
            return False
    return True


j1 = "text"
j2 = "xett"
print(valid2(j1,j2))



def valid_palindrome(s):
    s = str(s)
    i = 0
    last = len(s) - 1
    while i <= last:
        if str.isalnum(s[i]):
            print('current', s[i], s[last])
            if str.isalnum(s[last]):
                if str.lower(s[i]) == str.lower(s[last]):
                    i += 1
                    last -= 1
                else:
                    return False
            else:
                last -= 1
        else:
            i += 1

    return True


in1 = "A man, $#@@ a plan, a canal: Panama"
print(valid_palindrome(in1))

# METHOD
# loop with 2 pointers. exclude special chars. check if chars match and continue.




def myAtoi(s):
    INT_MAX = pow(2, 31) - 1
    INT_MIN = pow(-2, 31)

    # EASY CASES
    if len(s) == 0:
        return 0

    if len(s) == 1 and s[0] == '-':
        return 0

    if s[0].isalpha():
        return 0

    idx = -1
    for i in range(len(s)):
        # Stop if number or found + -
        if s[i].isnumeric() or s[i] in ['+', '-']:
            idx = i
            break
        elif s[i] == ' ':  # but continue if space
            continue
        else:  # found something weird end right away
            return 0

    output = ""
    # look at next position if +/- is found
    if idx >= 0:
        if s[idx] == '-':
            output += '-'
            idx += 1
        elif s[idx] == '+':
            idx += 1
    else:
        return 0

    # loop and find numerics. exit to ignore anything after.
    while idx < len(s):
        if s[idx].isnumeric():
            output += s[idx]
        else:
            break
        idx += 1

    # special case for '-' or if output is still empty
    if len(output) == 0 or (len(output) == 1 and output[0] == '-'):
        return 0

    # handle min max
    return INT_MIN if int(output) < INT_MIN else INT_MAX if int(output) > INT_MAX else int(output)


input_arr = "2222"
# input_arr = "-+12"
# input_arr = ".1"
# input_arr = "+w"
# input_arr = "+1"
# input_arr = "   -42"
# input_arr = "-"
# input_arr = "4193 with words"
# input_arr = "words and 987"
# input_arr = "-91283472332"

print(myAtoi(input_arr))


